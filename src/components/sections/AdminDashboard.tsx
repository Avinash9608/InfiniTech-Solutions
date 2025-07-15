'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IContact } from '@/models/Contact';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Trash, Mail, CheckCircle, Loader2 } from 'lucide-react';
import { deleteContact, replyToContact } from '@/app/actions/admin';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

type ContactWithId = Omit<IContact, 'createdAt'> & { _id: string; createdAt: string };

interface AdminDashboardProps {
  initialContacts: ContactWithId[];
}

export function AdminDashboard({ initialContacts }: AdminDashboardProps) {
  const [contacts, setContacts] = useState(initialContacts);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactWithId | null>(null);
  
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret') || '';
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    const result = await deleteContact(id, secret);
    if (result.success) {
      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast({ title: 'Success', description: result.message });
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
    setIsDeleting(null);
  };

  const handleReplySubmit = async (formData: FormData) => {
    setIsReplying(true);
    const result = await replyToContact(formData);
    if (result.success) {
      // Optimistically update the UI
      setContacts(prev => prev.map(c => c._id === selectedContact?._id ? {...c, replied: true} : c));
      toast({ title: 'Success', description: result.message });
      setSelectedContact(null); // Close dialog
    } else {
      toast({ title: 'Error', description: result.message, variant: 'destructive' });
    }
    setIsReplying(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Project Details</TableHead>
            <TableHead className="w-[120px] text-center">Status</TableHead>
            <TableHead className="w-[120px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell className="font-medium text-xs">
                {new Date(contact.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell className="max-w-sm truncate">{contact.projectDetails}</TableCell>
              <TableCell className="text-center">
                {contact.replied ? (
                  <span className="inline-flex items-center gap-1.5 text-green-600">
                    <CheckCircle className="w-4 h-4" /> Replied
                  </span>
                ) : (
                  <span className="text-muted-foreground">Pending</span>
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon" onClick={() => setSelectedContact(contact)}>
                  <Mail className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isDeleting === contact._id}>
                      {isDeleting === contact._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4 text-destructive" />}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the contact submission.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(contact._id)} className="bg-destructive hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {contacts.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No submissions yet.</p>
      )}

      {/* Reply Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to {selectedContact?.name}</DialogTitle>
            <DialogDescription>
              Your reply will be sent from {process.env.NEXT_PUBLIC_EMAIL_USER || 'your configured email'}.
            </DialogDescription>
          </DialogHeader>
          <form action={handleReplySubmit}>
            <input type="hidden" name="id" value={selectedContact?._id} />
            <input type="hidden" name="secret" value={secret} />
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="replyMessage">Your Message</Label>
                <Textarea id="replyMessage" name="replyMessage" rows={8} required />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isReplying}>
                {isReplying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send Reply
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
