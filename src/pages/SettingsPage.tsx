
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSidebar } from "@/hooks/useSidebar";
import { LogOut, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { ThemeType } from "@/hooks/useSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { isExpanded, currentTheme, setTheme } = useSidebar();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // All available themes
  const themes: {id: ThemeType, name: string, color: string}[] = [
    { id: 'default', name: 'Default Dark', color: '#1c1c1c' },
    { id: 'cyber-purple', name: 'Cyber Purple', color: '#2D1B69' },
    { id: 'warm-beige', name: 'Warm Beige', color: '#E8DCCA' },
    { id: 'forest-green', name: 'Forest Green', color: '#1E392A' },
    { id: 'ocean-sailing', name: 'Ocean Sailing', color: '#1a3a5f' },
    { id: 'mountain-sunset', name: 'Mountain Sunset', color: '#a83b3b' },
    { id: 'night-sky', name: 'Night Sky', color: '#0f1729' },
    { id: 'misty-meadow', name: 'Misty Meadow', color: '#567568' },
    { id: 'pink-dream', name: 'Pink Dream', color: '#f5a9b8' },
    { id: 'chocolate-brown', name: 'Chocolate Brown', color: '#5c3c10' },
    { id: 'anime-pastel', name: 'Anime Pastel', color: '#f6b8d1' },
    { id: 'aurora-lights', name: 'Aurora Lights', color: '#134e4a' },
    { id: 'desert-dunes', name: 'Desert Dunes', color: '#d4a76a' },
    { id: 'cherry-blossom', name: 'Cherry Blossom', color: '#f9c0c4' },
    { id: 'mystic-forest', name: 'Mystic Forest', color: '#2e5644' },
    { id: 'tech-noir', name: 'Tech Noir', color: '#202231' }
  ];
  
  // Helper function to get user name
  const getUserName = () => {
    if (!user) return 'Demo User';
    
    if ('name' in user && user.name) {
      return user.name;
    }
    
    return user.email?.split('@')[0] || 'Demo User';
  };
  
  // Helper function to get user email
  const getUserEmail = () => {
    if (!user) return 'demo@example.com';
    
    return user.email || 'demo@example.com';
  };
  
  return (
    <div className="min-h-screen container py-4 px-3 sm:px-6">
      <div className={`space-y-4 transition-all duration-300 ${isExpanded ? 'opacity-60 pointer-events-none' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lovable-uploads/d0a06e72-14a8-444f-a0a3-884930c14b8f.png" alt="CobraSave" className="w-8 h-8" />
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Separator className="w-full bg-primary/40" />
        </div>
      
        <Tabs defaultValue="account" className="mt-4 space-y-4">
          <TabsList className="w-full flex justify-between mb-2">
            <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
            <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
            <TabsTrigger value="billing" className="flex-1">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue={getUserName()} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={getUserEmail()} />
                </div>
                <Button>Update profile</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password for added security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Change password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>Manage your account session.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout} 
                  className="w-full sm:w-auto flex items-center gap-2"
                >
                  <LogOut size={18} />
                  <span>Log out</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Palette size={20} className="text-primary" />
                <div>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Customize the appearance of your CobraSave experience.</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <RadioGroup 
                    value={currentTheme} 
                    onValueChange={(val) => setTheme(val as ThemeType)} 
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                  >
                    {themes.map(theme => (
                      <div key={theme.id}>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={theme.id} id={theme.id} />
                          <Label htmlFor={theme.id} className="font-medium">{theme.name}</Label>
                        </div>
                        <div 
                          className="h-20 rounded-lg border border-sidebar-border" 
                          style={{backgroundColor: theme.color}}
                        ></div>
                      </div>
                    ))}
                  </RadioGroup>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-4">
            
            <Card>
              <CardHeader>
                <CardTitle>Premium Plan</CardTitle>
                <CardDescription>Upgrade to unlock premium features.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/30 p-6 rounded-lg border border-accent">
                  <h3 className="text-xl font-bold mb-2">Premium</h3>
                  <p className="text-3xl font-bold mb-4">$9.99<span className="text-sm font-normal">/month</span></p>
                  <Separator className="my-4" />
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Unlimited saved reels</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Premium themes</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Advanced categorization</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">✓</span>
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full">Subscribe now</Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Current plan: <span className="font-medium">Free</span></p>
                  <p>Limit: <span className="font-medium">50 saved reels</span></p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
