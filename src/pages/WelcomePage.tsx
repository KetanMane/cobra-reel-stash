
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/LoginForm";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function WelcomePage() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-2xl mb-6">
          CS
        </div>
        
        <h1 className="text-4xl font-bold mb-3">CobraSave</h1>
        <p className="text-xl text-muted-foreground mb-6 max-w-lg">
          Save and organize useful Instagram Reels with smart AI summaries
        </p>
        
        <Button size="lg" onClick={() => setShowLoginDialog(true)}>
          Get Started
        </Button>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <FeatureCard 
            icon="🎬"
            title="Save Reels"
            description="Quickly save Instagram Reels you want to remember"
          />
          <FeatureCard 
            icon="🤖"
            title="AI Summary"
            description="Automatically extract and summarize the key points"
          />
          <FeatureCard 
            icon="🔍"
            title="Easy Search"
            description="Find saved reels by category or keyword"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2023 CobraSave. All rights reserved.</p>
        </div>
      </footer>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <LoginForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: string; 
  title: string; 
  description: string;
}) {
  return (
    <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card hover-scale">
      <span className="text-3xl mb-4">{icon}</span>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
