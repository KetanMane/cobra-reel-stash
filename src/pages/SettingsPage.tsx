import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useSidebar, ThemeType } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {
  const { currentTheme, setTheme } = useSidebar();
  const { user } = useAuth();
  const { isExpanded } = useSidebar();

  const themes: { id: ThemeType; name: string; description: string }[] = [
    { id: "default", name: "Default Dark", description: "Clean dark interface with blue accents" },
    { id: "cyber-purple", name: "Cyber Purple", description: "Futuristic purple with neon accents" },
    { id: "warm-beige", name: "Warm Beige", description: "Cozy neutral tones for relaxed viewing" },
    { id: "forest-green", name: "Forest Green", description: "Deep greens inspired by nature" },
    { id: "ocean-sailing", name: "Ocean Sailing", description: "Refreshing blue water-inspired theme" },
    { id: "mountain-sunset", name: "Mountain Sunset", description: "Warm oranges and purples" },
    { id: "night-sky", name: "Night Sky", description: "Deep blues with starlight accents" },
    { id: "misty-meadow", name: "Misty Meadow", description: "Soft greens and gentle pastels" },
    { id: "pink-dream", name: "Pink Dream", description: "Sweet pinks and soft purples" },
    { id: "chocolate-brown", name: "Chocolate Brown", description: "Rich, earthy brown tones" },
    { id: "anime-pastel", name: "Anime Pastel", description: "Bright and colorful anime style" },
    { id: "aurora-lights", name: "Aurora Lights", description: "Vibrant northern lights colors" },
    { id: "desert-dunes", name: "Desert Dunes", description: "Warm sand tones and sunset hues" },
    { id: "cherry-blossom", name: "Cherry Blossom", description: "Delicate pinks and whites" },
    { id: "mystic-forest", name: "Mystic Forest", description: "Dark greens with magical accents" },
    { id: "tech-noir", name: "Tech Noir", description: "Sleek black with neon blue highlights" },
  ];
  
  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container max-w-md mx-auto py-3 px-2 space-y-2 transition-all duration-300 content-container ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-7 h-7" />
            <h1 className="text-lg font-bold">Settings</h1>
          </div>
        </div>

        <div className="flex justify-center">
          <Separator className="w-full bg-primary/40" />
        </div>
        
        {/* User Profile Section */}
        <div className="p-4 bg-secondary/50 rounded-md space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user && 'avatar' in user ? user.avatar : ''} />
              <AvatarFallback>{user?.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{user && 'name' in user ? user.name : user?.email?.split('@')[0]}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Change Password
            </Button>
          </div>
        </div>
        
        {/* Theme Selection */}
        <div className="rounded-md border border-accent/10 overflow-hidden">
          <div className="bg-secondary/50 p-3">
            <h3 className="font-medium">Appearance</h3>
            <p className="text-sm text-muted-foreground">Customize the look and feel</p>
          </div>
          
          <Separator />
          
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  className={cn(
                    "group cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-all",
                    theme.id === currentTheme ? "ring-2 ring-primary" : "border-border"
                  )}
                  onClick={() => setTheme(theme.id)}
                >
                  <div className={cn("h-24 w-full theme-preview", `theme-preview-${theme.id}`)}></div>
                  <div className="p-2">
                    <p className="font-medium text-sm">{theme.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{theme.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* App Settings */}
        <div className="rounded-md border border-accent/10 overflow-hidden">
          <div className="bg-secondary/50 p-3">
            <h3 className="font-medium">App Settings</h3>
            <p className="text-sm text-muted-foreground">Manage app behavior</p>
          </div>
          
          <Separator />
          
          <div className="p-3 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Compact View</p>
                <p className="text-sm text-muted-foreground">Show more content on screen</p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-sm text-muted-foreground">Get alerts for new shares</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use system preferred theme</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
        
        {/* Logout Button */}
        <Button variant="destructive" className="w-full">
          Log Out
        </Button>
        
        {/* App info */}
        <div className="text-center text-xs text-muted-foreground py-4">
          <p>CobraSave v1.0.0</p>
          <p>© 2025 CobraSave</p>
        </div>
      </div>
    </div>
  );
}
