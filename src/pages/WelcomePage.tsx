
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      {/* Logo and title */}
      <div className="flex flex-col items-center mb-6 animate-fade-in">
        <img 
          src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" 
          alt="CobraSave" 
          className="w-20 h-20 mb-4"
        />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">CobraSave</h1>
        <p className="text-muted-foreground mt-2 text-center max-w-md">
          Save any type of content from across the web in one place
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-md md:max-w-5xl animate-fade-in">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Save anything</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm">Save links, articles, videos, recipes, and more in one organized place.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Organize easily</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm">Categorize your saved content to find exactly what you need when you need it.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-lg">Access anywhere</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm">Your saved content syncs across all your devices for access anytime, anywhere.</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Start button - now redirects to login page */}
      <div className="w-full flex justify-center mt-4">
        <Button 
          size="lg" 
          className="animate-pulse"
          onClick={() => navigate('/login')}
        >
          Start Saving Reels
        </Button>
      </div>
    </div>
  );
}
