
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chatFlow } from '@/ai/flows/chat-flow';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const RobotIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
        <path d="M12,2A10,10,0,0,0,2,12c0,4.42,2.87,8.17,6.84,9.5c.5.08.66-0.21.66-0.47c0-0.23-0.01-0.84-0.01-1.64c-2.78,0.6-3.37-1.34-3.37-1.34c-0.45-1.16-1.11-1.47-1.11-1.47c-0.91-0.62,0.07-0.6,0.07-0.6c1,0.07,1.53,1.03,1.53,1.03c0.89,1.53,2.34,1.09,2.91,0.83c0.09-0.65,0.35-1.09,0.63-1.34C7.11,15.72,4.42,14.7,4.42,10.52c0-1.1,0.39-2,1.03-2.71c-0.1-0.25-0.45-1.28,0.1-2.67c0,0,0.84-0.27,2.75,1.02C9.2,6,9.6,5.95,10,5.95c0.4,0,0.8,0.05,1.18,0.15c1.91-1.29,2.75-1.02,2.75-1.02c0.55,1.39,0.2,2.42,0.1,2.67c0.64,0.71,1.03,1.61,1.03,2.71c0,4.19-2.69,5.2-5.27,5.5c0.36,0.31,0.68,0.92,0.68,1.86c0,1.34-0.01,2.42-0.01,2.75c0,0.27,0.16,0.56,0.67,0.47A10,10,0,0,0,12,2Z" />
    </svg>
);


export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: "Hello! I'm the InfiniTech support bot. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(scrollViewport) {
            scrollViewport.scrollTop = scrollViewport.scrollHeight;
        }
    }
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if(messages.length > 1) {
        scrollToBottom();
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatFlow({ query: input });
      if (response && response.answer) {
        const botMessage: Message = { role: 'bot', text: response.answer };
        setMessages((prev) => [...prev, botMessage]);
      } else {
         const errorMessage: Message = { role: 'bot', text: "Sorry, I couldn't get a response. Please try again." };
         setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = { role: 'bot', text: "Sorry, something went wrong. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-[100px] right-5 w-[350px] h-[500px] bg-card border rounded-lg shadow-xl flex flex-col z-50"
          >
            <header className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center gap-3">
                <RobotIcon className="w-6 h-6" />
                <h3 className="font-semibold text-lg">Support Bot</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">
                <X className="w-5 h-5" />
              </Button>
            </header>
            
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={cn('flex items-end gap-2', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {message.role === 'bot' && (
                      <Avatar className="w-8 h-8 bg-muted">
                        <AvatarFallback><RobotIcon className="w-5 h-5 text-muted-foreground" /></AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'p-3 rounded-lg max-w-[80%] text-sm shadow',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-secondary text-secondary-foreground rounded-bl-none'
                      )}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-end gap-2 justify-start">
                        <Avatar className="w-8 h-8 bg-muted">
                            <AvatarFallback><RobotIcon className="w-5 h-5 text-muted-foreground" /></AvatarFallback>
                        </Avatar>
                        <div className="p-3 rounded-lg bg-secondary text-secondary-foreground shadow rounded-bl-none flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-0"></span>
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-150"></span>
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse delay-300"></span>
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="pr-12"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-5 right-5 z-50"
      >
        <Button size="icon" className="w-16 h-16 rounded-full shadow-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-8 h-8" /> : <RobotIcon className="w-8 h-8" />}
        </Button>
      </motion.div>
    </>
  );
}
