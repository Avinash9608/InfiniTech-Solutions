
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IFooterContent, IQuickLink, ISocialLink } from '@/models/FooterContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { Trash, Edit, PlusCircle, Link as LinkIcon, Building2, Phone, Mail, Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
    updateCompanyInfo, 
    updateContactInfo,
    addQuickLink,
    editQuickLink,
    deleteQuickLink,
    addSocialLink,
    editSocialLink,
    deleteSocialLink
} from '@/app/actions/footer';

interface FooterAdminDashboardProps {
  initialContent: IFooterContent & { 
    _id: string;
    quickLinks: (IQuickLink & { _id: string })[];
    socialLinks: (ISocialLink & { _id: string })[];
  };
}

export default function FooterAdminDashboard({ initialContent }: FooterAdminDashboardProps) {
  const [content, setContent] = useState(initialContent);
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret');
  const { toast } = useToast();
  
  const handleCompanyInfoUpdate = async (formData: FormData) => {
    const result = await updateCompanyInfo(formData);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({...prev, 
        companyName: formData.get('companyName') as string,
        companyDescription: formData.get('companyDescription') as string
      }));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  const handleContactInfoUpdate = async (formData: FormData) => {
    const result = await updateContactInfo(formData);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({...prev, 
        contactInfo: {
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string
        }
      }));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  const handleQuickLinkDelete = async (id: string) => {
    const result = await deleteQuickLink(id, secret);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({ ...prev, quickLinks: prev.quickLinks.filter(l => l._id !== id) }));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  const handleSocialLinkDelete = async (id: string) => {
    const result = await deleteSocialLink(id, secret);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({ ...prev, socialLinks: prev.socialLinks.filter(l => l._id !== id) }));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* General Information */}
       <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <Building2 className="w-6 h-6 text-primary" />
                <CardTitle>Company Info</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <form action={handleCompanyInfoUpdate} className="space-y-4">
                <input type="hidden" name="secret" value={secret || ''} />
                <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" name="companyName" defaultValue={content.companyName} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="companyDescription">Description</Label>
                    <Textarea id="companyDescription" name="companyDescription" defaultValue={content.companyDescription} rows={4} required />
                </div>
                <Button type="submit">Save Company Info</Button>
            </form>
        </CardContent>
      </Card>
      
      {/* Contact Information */}
      <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-primary" />
                <CardTitle>Contact Info</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
             <form action={handleContactInfoUpdate} className="space-y-4">
                <input type="hidden" name="secret" value={secret || ''} />
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={content.contactInfo.email} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" defaultValue={content.contactInfo.phone} required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" defaultValue={content.contactInfo.address} required />
                </div>
                <Button type="submit">Save Contact Info</Button>
            </form>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <LinkIcon className="w-6 h-6 text-primary" />
            <CardTitle>Quick Links</CardTitle>
          </div>
          <AddLinkDialog secret={secret} type="quick" onAdd={addQuickLink} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.quickLinks.map((link) => (
                <TableRow key={link._id}>
                  <TableCell>{link.label}</TableCell>
                  <TableCell>{link.href}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <EditLinkDialog secret={secret} link={link} type="quick" onEdit={editQuickLink} />
                    <DeleteDialog onConfirm={() => handleQuickLinkDelete(link._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Share2 className="w-6 h-6 text-primary" />
            <CardTitle>Social Media Links</CardTitle>
          </div>
          <AddLinkDialog secret={secret} type="social" onAdd={addSocialLink} />
        </CardHeader>
        <CardContent>
          <Table>
             <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.socialLinks.map((link) => (
                <TableRow key={link._id}>
                  <TableCell>{link.label}</TableCell>
                  <TableCell className="max-w-xs truncate">{link.href}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <EditLinkDialog secret={secret} link={link} type="social" onEdit={editSocialLink}/>
                    <DeleteDialog onConfirm={() => handleSocialLinkDelete(link._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Reusable Dialog Components
function AddLinkDialog({ secret, type, onAdd }: { secret: string | null; type: 'quick' | 'social', onAdd: (formData: FormData) => Promise<any> }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
  
    async function formAction(formData: FormData) {
      const result = await onAdd(formData);
      if (result.success) {
        toast({ title: "Success", description: result.message });
        setOpen(false);
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    }
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Link</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New {type === 'quick' ? 'Quick' : 'Social'} Link</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="secret" value={secret || ''} />
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="label">Label / Platform Name</Label>
                <Input id="label" name="label" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="href">Full URL</Label>
                <Input id="href" name="href" required />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
}

function EditLinkDialog({ secret, link, type, onEdit }: { secret: string | null; link: (IQuickLink | ISocialLink) & {_id: string}; type: 'quick' | 'social', onEdit: (formData: FormData) => Promise<any> }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function formAction(formData: FormData) {
        const result = await onEdit(formData);
        if (result.success) {
            toast({ title: "Success", description: result.message });
            setOpen(false);
        } else {
            toast({ title: "Error", description: result.message, variant: "destructive" });
        }
    }
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {type === 'quick' ? 'Quick' : 'Social'} Link</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="secret" value={secret || ''} />
            <input type="hidden" name="id" value={link._id} />
            <div className="grid gap-4 py-4">
               <div className="grid gap-2">
                <Label htmlFor="label">Label / Platform Name</Label>
                <Input id="label" name="label" defaultValue={link.label} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="href">Full URL</Label>
                <Input id="href" name="href" defaultValue={link.href} required />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
}

function DeleteDialog({ onConfirm }: { onConfirm: () => void }) {
    return (
         <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon"><Trash className="w-4 h-4 text-destructive" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Delete Link?</AlertDialogTitle>
                <AlertDialogDescription>This will permanently remove the item. This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
