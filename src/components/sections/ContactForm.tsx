
"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Wand2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { submitContactForm, type FormSubmissionState } from '@/app/actions/contact';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        'Send Message & Generate Solutions'
      )}
    </Button>
  );
}

export default function ContactForm() {
  const initialState: FormSubmissionState = {
    success: false,
    message: null,
    solutions: null,
  };
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        formRef.current?.reset();
      } else {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

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
              <form ref={formRef} action={formAction} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="font-semibold">Full Name</Label>
                  <Input id="name" name="name" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="font-semibold">Email Address</Label>
                  <Input id="email" type="email" name="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-semibold">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" name="phone" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="projectDetails" className="font-semibold">Project / Business Details</Label>
                  <Textarea 
                    id="projectDetails" 
                    name="projectDetails"
                    required 
                    minLength={10}
                    rows={5} 
                    className="mt-1"
                    placeholder="Describe your business, current challenges, and goals..."
                  />
                </div>
                <SubmitButton />
              </form>

              {!state.success && state.message && (
                 <Alert variant="destructive" className="mt-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {state.success && state.solutions && (
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
                    {state.solutions}
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
