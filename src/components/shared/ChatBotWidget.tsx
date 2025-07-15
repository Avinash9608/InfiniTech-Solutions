
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
      <path d="M12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.32l-2,2L3.68,18.86A9.94,9.94,0,0,0,12,22a10,10,0,0,0,0-20ZM8.5,14a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,8.5,14Zm7,0a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,15.5,14Z" />
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
        <Button 
          size="icon" 
          className="w-20 h-20 rounded-full shadow-2xl flex flex-col gap-1 pt-1" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : (
            <>
              <RobotIcon className="w-8 h-8" />
              <span className="text-xs font-bold">Support</span>
            </>
          )}
        </Button>
      </motion.div>
    </>
  );
}
