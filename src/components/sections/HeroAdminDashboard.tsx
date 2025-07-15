
'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IHeroContent, ISlide } from '@/models/HeroContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Trash, Edit, PlusCircle, Tag, Image as ImageIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { addTagline, editTagline, deleteTagline, addSlide, editSlide, deleteSlide } from '@/app/actions/hero';

interface HeroAdminDashboardProps {
  initialContent: IHeroContent & { _id: string; slides: (ISlide & { _id: string })[] };
}

export function HeroAdminDashboard({ initialContent }: HeroAdminDashboardProps) {
  const [content, setContent] = useState(initialContent);
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret');
  const { toast } = useToast();

  const handleTaglineDelete = async (index: number) => {
    const result = await deleteTagline(index, secret);
    if(result.success) {
      toast({ title: "Success", description: result.message });
      setContent(prev => ({ ...prev, taglines: prev.taglines.filter((_, i) => i !== index) }));
    } else {
      toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  const handleSlideDelete = async (id: string) => {
    const result = await deleteSlide(id, secret);
    if(result.success) {
        toast({ title: "Success", description: result.message });
        setContent(prev => ({ ...prev, slides: prev.slides.filter(s => s._id !== id) }));
    } else {
        toast({ title: "Error", description: result.message, variant: 'destructive' });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Taglines Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-primary" />
            <CardTitle>Taglines</CardTitle>
          </div>
          <AddTaglineDialog secret={secret} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tagline</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.taglines.map((tagline, index) => (
                <TableRow key={index}>
                  <TableCell>{tagline}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <EditTaglineDialog secret={secret} tagline={tagline} index={index} />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon"><Trash className="w-4 h-4 text-destructive" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Tagline?</AlertDialogTitle>
                            <AlertDialogDescription>This will permanently remove the tagline. This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleTaglineDelete(index)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Slides Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-primary" />
            <CardTitle>Slides</CardTitle>
          </div>
          <AddSlideDialog secret={secret} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Text</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.slides.map((slide) => (
                <TableRow key={slide._id}>
                  <TableCell>
                    <Image src={slide.image} alt={slide.text} width={80} height={45} className="rounded-md object-cover" />
                  </TableCell>
                  <TableCell>{slide.text}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <EditSlideDialog secret={secret} slide={slide} />
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon"><Trash className="w-4 h-4 text-destructive" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete Slide?</AlertDialogTitle>
                            <AlertDialogDescription>This will permanently remove the slide. This action cannot be undone.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleSlideDelete(slide._id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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

// Add Tagline Dialog Component
function AddTaglineDialog({ secret }: { secret: string | null }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
  
    async function formAction(formData: FormData) {
      const result = await addTagline(formData);
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
          <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Tagline</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tagline</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="secret" value={secret || ''} />
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tagline">Tagline Text</Label>
                <Input id="tagline" name="tagline" required />
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
  
// Edit Tagline Dialog Component
function EditTaglineDialog({ secret, tagline, index }: { secret: string | null; tagline: string; index: number }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function formAction(formData: FormData) {
        const result = await editTagline(formData);
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
            <DialogTitle>Edit Tagline</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <input type="hidden" name="secret" value={secret || ''} />
            <input type="hidden" name="index" value={index} />
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="tagline">Tagline Text</Label>
                <Input id="tagline" name="tagline" defaultValue={tagline} required />
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

// Add Slide Dialog Component
function AddSlideDialog({ secret }: { secret: string | null }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function formAction(formData: FormData) {
        const result = await addSlide(formData);
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
                <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Slide</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Slide</DialogTitle>
                </DialogHeader>
                <form action={formAction}>
                    <input type="hidden" name="secret" value={secret || ''} />
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input id="image" name="image" placeholder="https://example.com/image.png" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="text">Text</Label>
                            <Input id="text" name="text" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dataAiHint">AI Hint (for image search)</Label>
                            <Input id="dataAiHint" name="dataAiHint" />
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

// Edit Slide Dialog Component
function EditSlideDialog({ secret, slide }: { secret: string | null; slide: ISlide & { _id: string } }) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    async function formAction(formData: FormData) {
        const result = await editSlide(formData);
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
                    <DialogTitle>Edit Slide</DialogTitle>
                </DialogHeader>
                <form action={formAction}>
                    <input type="hidden" name="secret" value={secret || ''} />
                    <input type="hidden" name="id" value={slide._id} />
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="image">Image URL</Label>
                            <Input id="image" name="image" defaultValue={slide.image} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="text">Text</Label>
                            <Input id="text" name="text" defaultValue={slide.text} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dataAiHint">AI Hint (for image search)</Label>
                            <Input id="dataAiHint" name="dataAiHint" defaultValue={slide.dataAiHint} />
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
