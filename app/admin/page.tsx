import dbConnect from '@/lib/db';
import Contact, { IContact } from '@/models/Contact';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert, Inbox } from 'lucide-react';
import { AdminDashboard } from '@/components/sections/AdminDashboard';

// This function now returns the raw mongoose documents with ObjectId
async function getContacts() {
  await dbConnect();
  const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
  return contacts;
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

  const contactsData = await getContacts();
  // We serialize the data here before passing it to the client component.
  // This ensures that only plain JSON objects are passed.
  const contacts = JSON.parse(JSON.stringify(contactsData)) as (Omit<IContact, 'createdAt'> & { _id: string; createdAt: string; })[];

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
            <AdminDashboard initialContacts={contacts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
