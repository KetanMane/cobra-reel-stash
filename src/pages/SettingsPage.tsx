
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useSidebar, ThemeType } from "@/hooks/useSidebar";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useViewType } from "@/hooks/useViewType";
import { Crown } from "lucide-react";

export default function SettingsPage() {
  const { currentTheme, setTheme } = useSidebar();
  const { user } = useAuth();
  const { isExpanded } = useSidebar();
  const { viewType, setViewType } = useViewType();
  const [activeTab, setActiveTab] = useState("account");

  // Pure color themes inspired by the image
  const colorThemes = [
    {
      name: "Blue",
      id: "ocean-sailing",
      color: "bg-blue-400"
    },
    {
      name: "Pink",
      id: "cherry-blossom",
      color: "bg-pink-400"
    },
    {
      name: "Teal",
      id: "misty-meadow",
      color: "bg-teal-400"
    },
    {
      name: "Dark",
      id: "default",
      color: "bg-gray-800"
    },
    {
      name: "Red",
      id: "mountain-sunset",
      color: "bg-red-400"
    },
    {
      name: "Yellow",
      id: "warm-beige",
      color: "bg-yellow-400"
    },
    {
      name: "Green",
      id: "forest-green",
      color: "bg-green-500"
    },
    {
      name: "Orange",
      id: "desert-dunes",
      color: "bg-orange-400"
    },
    {
      name: "Purple",
      id: "cyber-purple",
      color: "bg-purple-500",
      isPremium: true
    }
  ];

  // Texture themes
  const textureThemes = [
    {
      name: "Paper",
      id: "night-sky",
      color: "bg-gradient-to-br from-gray-100 to-gray-200",
      dotColor: "bg-blue-400"
    },
    {
      name: "Canvas",
      id: "warm-beige",
      color: "bg-gradient-to-br from-amber-50 to-amber-100",
      dotColor: "bg-red-400"
    },
    {
      name: "Linen",
      id: "anime-pastel",
      color: "bg-gradient-to-br from-purple-50 to-purple-100",
      dotColor: "bg-purple-500"
    },
    {
      name: "Minimal",
      id: "misty-meadow",
      color: "bg-gradient-to-br from-gray-50 to-white",
      dotColor: "bg-green-500"
    }
  ];

  // Scene themes
  const sceneThemes = [
    {
      name: "Nature",
      id: "misty-meadow",
      image: "/lovable-uploads/bf86b33a-ed0c-4b84-8354-eed54c389c78.png"
    },
    {
      name: "Space",
      id: "night-sky",
      image: "/lovable-uploads/d0a06e72-14a8-444f-a0a3-884930c14b8f.png"
    },
    {
      name: "Astronaut",
      id: "tech-noir",
      image: "/lovable-uploads/8913af60-6157-40b0-96fa-458888cc390e.png"
    },
    {
      name: "Sky",
      id: "ocean-sailing",
      image: "/lovable-uploads/d9d4f479-2706-49ad-9845-6eddeea96620.png"
    }
  ];
  
  return (
    <div className="min-h-screen flex-1 relative">
      <div className={`flex-1 container max-w-md mx-auto py-3 px-2 space-y-3 transition-all duration-300 content-container ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        {/* Header section */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/f41b8346-c7fe-437f-9020-e26ed4c5ba93.png" alt="CobraSave" className="w-7 h-7" />
            <h1 className="text-lg font-bold">Settings</h1>
          </div>
        </div>

        <div className="flex justify-center">
          <Separator className="w-full bg-primary/40" />
        </div>
        
        {/* Tabs navigation */}
        <Tabs defaultValue="account" className="w-full animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="appearance">Themes</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4 animate-fade-in">
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
                <Button variant="outline" size="sm" className="flex-1 transition-all hover:scale-105">
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1 transition-all hover:scale-105">
                  Change Password
                </Button>
              </div>
            </div>
            
            {/* Billing Section */}
            <div className="rounded-md border border-accent/10 overflow-hidden">
              <div className="bg-secondary/50 p-3">
                <h3 className="font-medium">Subscription</h3>
                <p className="text-sm text-muted-foreground">Manage your plan and billing</p>
              </div>
              
              <Separator />
              
              <div className="p-4">
                <div className="bg-primary/5 rounded-md p-3 mb-3">
                  <p className="font-medium">Current Plan: <span className="text-primary">Free</span></p>
                  <p className="text-sm text-muted-foreground">5 reels per day</p>
                </div>
                
                <Button className="w-full transition-all hover:scale-105">
                  Upgrade to Pro
                </Button>
              </div>
            </div>
            
            {/* Logout Button */}
            <Button variant="destructive" className="w-full transition-all hover:scale-105">
              Log Out
            </Button>
          </TabsContent>
          
          {/* Themes Tab - Redesigned with inspiration from the image */}
          <TabsContent value="appearance" className="space-y-4 animate-fade-in">
            {/* Pure Colors Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Pure Color</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {colorThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105",
                      theme.id === currentTheme ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                    )}
                    onClick={() => setTheme(theme.id as ThemeType)}
                  >
                    <div className={cn(
                      "h-16 w-full rounded-xl shadow-sm",
                      theme.color
                    )}>
                      {theme.isPremium && (
                        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                          <Crown className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Texture Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Texture</h3>
                <Crown className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {textureThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105",
                      theme.id === currentTheme ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                    )}
                    onClick={() => setTheme(theme.id as ThemeType)}
                  >
                    <div className={cn(
                      "h-16 w-full rounded-xl shadow-sm relative overflow-hidden flex items-center justify-center",
                      theme.color
                    )}>
                      <div className={cn("h-4 w-4 rounded-full", theme.dotColor)}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Scenery Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg">Scenery</h3>
                <Crown className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {sceneThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className={cn(
                      "cursor-pointer transition-all hover:scale-105",
                      theme.id === currentTheme ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                    )}
                    onClick={() => setTheme(theme.id as ThemeType)}
                  >
                    <div className="h-32 w-full rounded-xl shadow-sm overflow-hidden">
                      <img 
                        src={theme.image} 
                        alt={theme.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center text-xs text-muted-foreground mt-6">
              <p><Crown className="inline h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" /> Premium themes available with Pro plan</p>
            </div>
          </TabsContent>
          
          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-4 animate-fade-in">
            <div className="rounded-md border border-accent/10 overflow-hidden">
              <div className="bg-secondary/50 p-3">
                <h3 className="font-medium">Display Settings</h3>
                <p className="text-sm text-muted-foreground">Manage how content appears</p>
              </div>
              
              <Separator />
              
              <div className="p-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">View Mode</p>
                    <p className="text-sm text-muted-foreground">Grid or list layout</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("text-xs", viewType === "list" ? "text-primary font-medium" : "text-muted-foreground")}>List</span>
                    <Switch 
                      checked={viewType === "grid"} 
                      onCheckedChange={(checked) => setViewType(checked ? "grid" : "list")}
                      className="transition-all" 
                    />
                    <span className={cn("text-xs", viewType === "grid" ? "text-primary font-medium" : "text-muted-foreground")}>Grid</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-muted-foreground">Get alerts for new shares</p>
                  </div>
                  <Switch defaultChecked className="transition-all" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Use system preferred theme</p>
                  </div>
                  <Switch defaultChecked className="transition-all" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-categorize</p>
                    <p className="text-sm text-muted-foreground">Use AI to sort content</p>
                  </div>
                  <Switch defaultChecked className="transition-all" />
                </div>
              </div>
            </div>
            
            <div className="rounded-md border border-accent/10 overflow-hidden">
              <div className="bg-secondary/50 p-3">
                <h3 className="font-medium">Privacy & Data</h3>
                <p className="text-sm text-muted-foreground">Manage your data and privacy</p>
              </div>
              
              <Separator />
              
              <div className="p-3 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-muted-foreground">Help improve CobraSave</p>
                  </div>
                  <Switch defaultChecked className="transition-all" />
                </div>
                
                <Button variant="outline" size="sm" className="w-full transition-all hover:scale-105">
                  Export My Data
                </Button>
                
                <Button variant="outline" size="sm" className="w-full text-destructive-foreground bg-destructive/10 border-destructive/20 hover:bg-destructive/20 transition-all hover:scale-105">
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* App info */}
        <div className="text-center text-xs text-muted-foreground py-4 animate-fade-in">
          <p>CobraSave v1.0.0</p>
          <p>© 2025 CobraSave</p>
        </div>
      </div>
    </div>
  );
}
