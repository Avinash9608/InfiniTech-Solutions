
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IWhyChooseUsContent, IUspItem } from '@/models/WhyChooseUsContent';
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
import { Trash, Edit, PlusCircle, HeartHandshake, Icon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { addUspItem, editUspItem, deleteUspItem } from '@/app/actions/why-choose-us';
import * as LucideIcons from 'lucide-react';

interface WhyChooseUsAdminDashboardProps {
  initialContent: IWhyChooseUsContent & { 
    _id: string;
    uspItems: (IUspItem & { _id: string })[];
  };
}

const renderIcon = (iconName: string, props = {}) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent ? <IconComponent {...props} /> : <HeartHandshake {...props} />;
};


export default function WhyChooseUsAdminDashboard({ initialContent }: WhyChooseUsAdminDashboardProps) {
  const [content, setContent] = useState(initialContent);
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret');
  const { toast } = useToast();
  
  const handleDelete = async (id: string) => {
    const result = await deleteUspItem(id, secret);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({ ...prev, uspItems: prev.uspItems.filter(item => item._id !== id) }));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>USP Items</CardTitle>
            <AddUspItemDialog secret={secret} onAdd={addUspItem} />
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="w-[50px]">Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {content.uspItems.map((item) => (
                <TableRow key={item._id}>
                <TableCell>{renderIcon(item.icon, {className: "w-5 h-5 text-primary"})}</TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right space-x-1">
                    <EditUspItemDialog secret={secret} item={item} onEdit={editUspItem} />
                    <DeleteDialog onConfirm={() => handleDelete(item._id)} />
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </CardContent>
    </Card>
  );
}

// Reusable Dialog Components
function AddUspItemDialog({ secret, onAdd }: { secret: string | null; onAdd: (formData: FormData) => Promise<any> }) {
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
          <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Item</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New USP Item</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="secret" value={secret || ''} />
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="icon">Lucide Icon Name</Label>
                <Input id="icon" name="icon" placeholder="e.g. Users, Zap, Clock" required />
                <p className="text-xs text-muted-foreground">Find icon names on <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev</a></p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
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

function EditUspItemDialog({ secret, item, onEdit }: { secret: string | null; item: IUspItem & {_id: string}; onEdit: (formData: FormData) => Promise<any> }) {
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
            <DialogTitle>Edit USP Item</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="secret" value={secret || ''} />
            <input type="hidden" name="id" value={item._id} />
             <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={item.title} required />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="icon">Lucide Icon Name</Label>
                <Input id="icon" name="icon" defaultValue={item.icon} placeholder="e.g. Users, Zap, Clock" required />
                <p className="text-xs text-muted-foreground">Find icon names on <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline">lucide.dev</a></p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={item.description} required />
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
                <AlertDialogTitle>Delete Item?</AlertDialogTitle>
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
