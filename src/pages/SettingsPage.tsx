import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { user } = useAuth();
  const [selectedTheme, setSelectedTheme] = useState("default");
  
  return (
    <div className="min-h-screen container py-6">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/8913af60-6157-40b0-96fa-458888cc390e.png" alt="CobraSave" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>
      
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
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
                <Input id="name" defaultValue={user?.name || "Demo User"} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || "demo@example.com"} />
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
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of your CobraSave experience.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="default" id="default" />
                    <Label htmlFor="default" className="font-medium">Default Dark</Label>
                  </div>
                  <div className="h-24 bg-sidebar rounded-lg border border-sidebar-border"></div>
                </div>
                <div className="opacity-60 cursor-not-allowed">
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="cyber-purple" id="cyber-purple" disabled />
                    <Label htmlFor="cyber-purple" className="font-medium">Cyber Purple</Label>
                    <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded">Premium</span>
                  </div>
                  <div className="h-24 bg-[#2D1B69] rounded-lg border border-[#3F2980]"></div>
                </div>
                <div className="opacity-60 cursor-not-allowed">
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="warm-beige" id="warm-beige" disabled />
                    <Label htmlFor="warm-beige" className="font-medium">Warm Beige</Label>
                    <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded">Premium</span>
                  </div>
                  <div className="h-24 bg-[#E8DCCA] rounded-lg border border-[#D6C9B5]"></div>
                </div>
                <div className="opacity-60 cursor-not-allowed">
                  <div className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value="forest-green" id="forest-green" disabled />
                    <Label htmlFor="forest-green" className="font-medium">Forest Green</Label>
                    <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded">Premium</span>
                  </div>
                  <div className="h-24 bg-[#1E392A] rounded-lg border border-[#2D4D3A]"></div>
                </div>
              </RadioGroup>
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
  );
}
