
"use client";

import { useState, useTransition } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { generateItSolutions } from '@/ai/flows/generate-it-solutions';
import { motion } from 'framer-motion';

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
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to submit message.');
        }

        const result = await generateItSolutions({ businessDetails: data.projectDetails });
        setAiSolution(result);
        
        toast({
          title: "Message Sent & Solutions Generated!",
          description: "We've received your details and will be in touch soon.",
        });
        reset();
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
                  {errors.name && <p className="text-sm text-destructive mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold">Email Address</Label>
                  <Input id="email" type="email" {...register('email')} className={`mt-1 ${errors.email ? 'border-destructive' : ''}`} />
                  {errors.email && <p className="text-sm text-destructive mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.email.message}</p>}
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
                  {errors.projectDetails && <p className="text-sm text-destructive mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.projectDetails.message}</p>}
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
            </CardContent>
          </Card>

          {aiSolution && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <Card className="bg-accent/10 border-accent/30 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/20 rounded-full">
                      <Wand2 className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-accent text-2xl">AI-Generated Recommendations</CardTitle>
                  </div>
                  <CardDescription className="text-accent-foreground/80 pl-11">
                    Based on your project details, here are some potential IT solutions to consider:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert prose-p:text-foreground/90 prose-ul:list-disc prose-ul:pl-6 prose-li:text-foreground/90 whitespace-pre-wrap p-4 bg-background/50 rounded-md border border-accent/20">
                    {aiSolution.solutions}
                  </div>
                </CardContent>
                <CardFooter>
                   <p className="text-xs text-muted-foreground">
                    This is an automated suggestion. Our experts will reach out to discuss these ideas in more detail.
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
