
import dbConnect from '@/lib/db';
import Contact, { IContact } from '@/models/Contact';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert, Inbox } from 'lucide-react';

async function getContacts(): Promise<IContact[]> {
  await dbConnect();
  const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
  // Mongoose lean objects don't have a toJSON method with transform, so we manually convert ObjectId
  return JSON.parse(JSON.stringify(contacts));
}

interface AdminPageProps {
  searchParams: {
    secret?: string;
  };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const adminSecret = process.env.ADMIN_SECRET;
  const providedSecret = searchParams.secret;

  if (!adminSecret || providedSecret !== adminSecret) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-background text-center px-4">
        <ShieldAlert className="w-24 h-24 text-destructive mb-6" />
        <h1 className="text-4xl font-bold text-primary mb-2">Access Denied</h1>
        <p className="text-muted-foreground max-w-md">
          You do not have permission to view this page. Please provide the correct secret key.
        </p>
      </div>
    );
  }

  const contacts = await getContacts();

  return (
    <div className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Inbox className="w-8 h-8 text-primary" />
                        <div>
                            <CardTitle className="text-3xl font-bold text-primary">Contact Submissions</CardTitle>
                            <CardDescription>Messages received from the contact form.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableCaption>A list of your recent contact form submissions.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[150px]">Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="w-2/5">Project Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact) => (
                            <TableRow key={contact._id}>
                                <TableCell className="font-medium">
                                {new Date(contact.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                                </TableCell>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phone || 'N/A'}</TableCell>
                                <TableCell>{contact.projectDetails}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {contacts.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No submissions yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
