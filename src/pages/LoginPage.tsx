
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      {/* Login/Registration form with logo above form */}
      <div className="w-full max-w-md animate-fade-in">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" 
                alt="CobraSave" 
                className="w-16 h-16 rounded-full bg-background p-2 shadow-md"
              />
            </div>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              {showLogin 
                ? "Enter your credentials to access your saved content" 
                : "Sign up to start organizing your content"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showLogin ? <LoginForm /> : <RegisterForm />}
          </CardContent>
          <CardFooter>
            <Button 
              variant="link" 
              className="mx-auto" 
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
