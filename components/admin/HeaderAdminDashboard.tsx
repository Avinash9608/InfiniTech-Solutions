
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IHeaderContent, INavLink } from '@/models/HeaderContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Trash, Edit, PlusCircle, Link as LinkIcon, MenuSquare, RadioButton } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { updateLogoText, updateCtaButton, addNavLink, editNavLink, deleteNavLink, addServiceLink, editServiceLink, deleteServiceLink } from '@/app/actions/header';

interface HeaderAdminDashboardProps {
  initialContent: IHeaderContent & { 
    _id: string;
    navLinks: (INavLink & { _id: string })[];
    serviceLinks: (INavLink & { _id: string })[];
  };
}

export default function HeaderAdminDashboard({ initialContent }: HeaderAdminDashboardProps) {
  const [content, setContent] = useState(initialContent);
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret');
  const { toast } = useToast();

  const handleUpdateLogo = async (formData: FormData) => {
    const result = await updateLogoText(formData);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({...prev, logoText: formData.get('logoText') as string}));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  const handleUpdateCta = async (formData: FormData) => {
    const result = await updateCtaButton(formData);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({...prev, ctaButton: { label: formData.get('label') as string, href: formData.get('href') as string }}));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  const handleNavLinkDelete = async (id: string) => {
    const result = await deleteNavLink(id, secret);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({ ...prev, navLinks: prev.navLinks.filter(l => l._id !== id) }));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  const handleServiceLinkDelete = async (id: string) => {
    const result = await deleteServiceLink(id, secret);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({ ...prev, serviceLinks: prev.serviceLinks.filter(l => l._id !== id) }));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* General Settings */}
      <Card>
        <CardHeader>
            <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <form action={handleUpdateLogo} className="space-y-2">
                <input type="hidden" name="secret" value={secret || ''} />
                <Label htmlFor="logoText">Logo Text</Label>
                <div className="flex gap-2">
                    <Input id="logoText" name="logoText" defaultValue={content.logoText} required />
                    <Button type="submit">Save</Button>
                </div>
            </form>
            <form action={handleUpdateCta} className="space-y-2">
                 <input type="hidden" name="secret" value={secret || ''} />
                 <Label>CTA Button</Label>
                 <div className="flex gap-2">
                    <Input name="label" placeholder="Label" defaultValue={content.ctaButton.label} required />
                    <Input name="href" placeholder="URL (e.g., /contact)" defaultValue={content.ctaButton.href} required />
                    <Button type="submit">Save</Button>
                 </div>
            </form>
        </CardContent>
      </Card>
      <div></div>

      {/* Navigation Links Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <LinkIcon className="w-6 h-6 text-primary" />
            <CardTitle>Navigation Links</CardTitle>
          </div>
          <AddLinkDialog secret={secret} type="nav" onAdd={addNavLink} />
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
              {content.navLinks.map((link) => (
                <TableRow key={link._id}>
                  <TableCell>{link.label}</TableCell>
                  <TableCell>{link.href}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <EditLinkDialog secret={secret} link={link} type="nav" onEdit={editNavLink} />
                    <DeleteDialog onConfirm={() => handleNavLinkDelete(link._id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Service Dropdown Links Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <MenuSquare className="w-6 h-6 text-primary" />
            <CardTitle>Service Dropdown Links</CardTitle>
          </div>
          <AddLinkDialog secret={secret} type="service" onAdd={addServiceLink} />
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
              {content.serviceLinks.map((link) => (
                <TableRow key={link._id}>
                  <TableCell>{link.label}</TableCell>
                  <TableCell>{link.href}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <EditLinkDialog secret={secret} link={link} type="service" onEdit={editServiceLink}/>
                    <DeleteDialog onConfirm={() => handleServiceLinkDelete(link._id)} />
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

// Dialog Components
function AddLinkDialog({ secret, type, onAdd }: { secret: string | null; type: 'nav' | 'service', onAdd: (formData: FormData) => Promise<any> }) {
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
            <DialogTitle>Add New {type === 'nav' ? 'Navigation' : 'Service'} Link</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="secret" value={secret || ''} />
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="label">Label</Label>
                <Input id="label" name="label" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="href">URL</Label>
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

function EditLinkDialog({ secret, link, type, onEdit }: { secret: string | null; link: INavLink & {_id: string}; type: 'nav' | 'service', onEdit: (formData: FormData) => Promise<any> }) {
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
            <DialogTitle>Edit {type === 'nav' ? 'Navigation' : 'Service'} Link</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="secret" value={secret || ''} />
            <input type="hidden" name="id" value={link._id} />
            <div className="grid gap-4 py-4">
               <div className="grid gap-2">
                <Label htmlFor="label">Label</Label>
                <Input id="label" name="label" defaultValue={link.label} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="href">URL</Label>
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
                <AlertDialogDescription>This will permanently remove the link. This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
