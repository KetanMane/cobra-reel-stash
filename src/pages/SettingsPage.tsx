
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

export default function SettingsPage() {
  const { currentTheme, setTheme } = useSidebar();
  const { user } = useAuth();
  const { isExpanded } = useSidebar();
  const { viewType, setViewType } = useViewType();
  const [activeTab, setActiveTab] = useState("account");

  // Group themes by colors
  const themeGroups = [
    {
      name: "Dark & Blue",
      themes: [
        { id: "default", name: "Default Dark", description: "Clean dark interface with blue accents" },
        { id: "tech-noir", name: "Tech Noir", description: "Sleek black with neon blue highlights" },
        { id: "night-sky", name: "Night Sky", description: "Deep blues with starlight accents" },
        { id: "ocean-sailing", name: "Ocean Sailing", description: "Refreshing blue water-inspired theme" },
      ]
    },
    {
      name: "Purple & Pink",
      themes: [
        { id: "cyber-purple", name: "Cyber Purple", description: "Futuristic purple with neon accents" },
        { id: "pink-dream", name: "Pink Dream", description: "Sweet pinks and soft purples" },
        { id: "anime-pastel", name: "Anime Pastel", description: "Bright and colorful anime style" },
        { id: "aurora-lights", name: "Aurora Lights", description: "Vibrant northern lights colors" },
        { id: "cherry-blossom", name: "Cherry Blossom", description: "Delicate pinks and whites" },
      ]
    },
    {
      name: "Earth Tones",
      themes: [
        { id: "warm-beige", name: "Warm Beige", description: "Cozy neutral tones for relaxed viewing" },
        { id: "forest-green", name: "Forest Green", description: "Deep greens inspired by nature" },
        { id: "mountain-sunset", name: "Mountain Sunset", description: "Warm oranges and purples" },
        { id: "misty-meadow", name: "Misty Meadow", description: "Soft greens and gentle pastels" },
        { id: "chocolate-brown", name: "Chocolate Brown", description: "Rich, earthy brown tones" },
        { id: "desert-dunes", name: "Desert Dunes", description: "Warm sand tones and sunset hues" },
        { id: "mystic-forest", name: "Mystic Forest", description: "Dark greens with magical accents" },
      ]
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
          
          {/* Themes Tab */}
          <TabsContent value="appearance" className="space-y-4 animate-fade-in">
            {themeGroups.map((group) => (
              <div key={group.name} className="space-y-3">
                <h3 className="font-medium text-sm text-primary">{group.name}</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {group.themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={cn(
                        "group cursor-pointer rounded-md overflow-hidden border hover:border-primary transition-all hover:scale-105",
                        theme.id === currentTheme ? "ring-2 ring-primary" : "border-border"
                      )}
                      onClick={() => setTheme(theme.id as ThemeType)}
                    >
                      <div className={cn("h-24 w-full theme-preview", `theme-preview-${theme.id}`)}></div>
                      <div className="p-2">
                        <p className="font-medium text-sm">{theme.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{theme.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="opacity-50" />
              </div>
            ))}
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
