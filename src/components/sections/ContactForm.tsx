"use client";

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import { generateItSolutions } from '@/ai/flows/generate-it-solutions';
import { useToast } from "@/hooks/use-toast";


const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  projectDetails: z.string().min(10, { message: "Please provide some details about your project." }),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

interface AISolution {
  solutions: string;
}

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [aiSolution, setAiSolution] = useState<AISolution | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setFormError(null);
    setAiSolution(null);

    startTransition(async () => {
      try {
        // Simulate form submission
        console.log("Form data submitted:", data);
        // Call AI solution generator
        const result = await generateItSolutions({ businessDetails: data.projectDetails });
        setAiSolution(result);
        toast({
          title: "Message Sent & Solutions Generated!",
          description: "We've received your details and generated some initial IT solutions.",
        });
        reset(); // Reset form after successful submission
      } catch (error) {
        console.error("Error submitting form or generating AI solution:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
        setFormError(`Failed to process your request. ${errorMessage}`);
        toast({
          title: "Submission Error",
          description: `Could not process your request: ${errorMessage}`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or need expert IT advice? Fill out the form below, and we'll get back to you. 
            Provide your business details to get AI-powered IT solution recommendations!
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Contact Us & Get AI Insights</CardTitle>
              <CardDescription>Tell us about your business needs for personalized IT solutions.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-semibold">Full Name</Label>
                  <Input id="name" {...register('name')} className={`mt-1 ${errors.name ? 'border-destructive' : ''}`} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold">Email Address</Label>
                  <Input id="email" type="email" {...register('email')} className={`mt-1 ${errors.email ? 'border-destructive' : ''}`} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone" className="font-semibold">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" {...register('phone')} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="projectDetails" className="font-semibold">Project / Business Details</Label>
                  <Textarea 
                    id="projectDetails" 
                    {...register('projectDetails')} 
                    rows={5} 
                    className={`mt-1 ${errors.projectDetails ? 'border-destructive' : ''}`}
                    placeholder="Describe your business, current challenges, and goals..."
                  />
                  {errors.projectDetails && <p className="text-sm text-destructive mt-1">{errors.projectDetails.message}</p>}
                </div>
                <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Send Message & Generate Solutions'
                  )}
                </Button>
              </form>

              {formError && (
                 <Alert variant="destructive" className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              {aiSolution && (
                <Alert className="mt-6 border-accent text-accent-foreground bg-accent/10">
                  <Lightbulb className="h-5 w-5 text-accent" />
                  <AlertTitle className="font-semibold text-accent">AI-Generated IT Solution Ideas</AlertTitle>
                  <AlertDescription className="whitespace-pre-wrap mt-2 text-sm">
                    {aiSolution.solutions}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
