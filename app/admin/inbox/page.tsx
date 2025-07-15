import dbConnect from '@/lib/db';
import Contact, { IContact } from '@/models/Contact';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Inbox } from 'lucide-react';
import { AdminDashboard } from '@/components/sections/AdminDashboard';

async function getContacts() {
  await dbConnect();
  const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();
  return contacts;
}

export default async function InboxPage() {
  const contactsData = await getContacts();
  const contacts = JSON.parse(JSON.stringify(contactsData)) as (Omit<IContact, 'createdAt'> & { _id: string; createdAt: string; })[];

  return (
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
  );
}
