
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, loginWithMock } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoggingIn(true);
    
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  const handleDemoLogin = async () => {
    try {
      await loginWithMock();
    } catch (error) {
      console.error("Demo login error:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="you@example.com" 
                    type="email" 
                    autoComplete="email"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="••••••••" 
                    type="password"
                    autoComplete="current-password"
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full mt-6 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" 
            disabled={isLoggingIn}
          >
            {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      {/* Social login options */}
      <div className="flex gap-3 justify-center mb-4">
        <Button variant="outline" size="icon" className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10">
          <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10">
          <img src="https://cdn-icons-png.flaticon.com/512/3670/3670147.png" alt="TikTok" className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10">
          <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full transition-all duration-300 hover:scale-110 hover:bg-primary/10">
          <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-5 h-5" />
        </Button>
      </div>

      <Button 
        variant="outline" 
        className="w-full transition-all duration-300 hover:bg-secondary/80"
        onClick={handleDemoLogin}
      >
        Continue with Demo Account
      </Button>
    </div>
  );
}
