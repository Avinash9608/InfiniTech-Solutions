import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] bg-background text-center px-4">
      <TriangleAlert className="w-24 h-24 text-destructive mb-6" />
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button asChild>
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}
