
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function DonatePage() {
  const [amount, setAmount] = useState("5");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const presetAmounts = ["5", "10", "25", "50"];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate donation processing
    setTimeout(() => {
      toast({
        title: "Thank you for your support!",
        description: `Your donation of $${amount} has been received.`
      });
      setIsSubmitting(false);
      setAmount("5");
      setName("");
      setMessage("");
    }, 1500);
  };
  
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="h-6 w-6 text-red-500" />
        <h1 className="text-3xl font-bold">Support CobraSave</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
          <CardDescription>
            Your support helps us maintain and improve CobraSave. All donations go directly toward development costs.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Amount</label>
              <div className="flex flex-wrap gap-2">
                {presetAmounts.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant={amount === preset ? "default" : "outline"}
                    onClick={() => setAmount(preset)}
                    className="flex-1"
                  >
                    ${preset}
                  </Button>
                ))}
                <div className="w-full mt-2">
                  <label className="text-sm text-muted-foreground">Custom Amount</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <Input 
                      type="number" 
                      min="1"
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name (Optional)</label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Anonymous"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Message (Optional)</label>
              <Input 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message for the developer"
              />
            </div>
          </form>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            disabled={!amount || Number(amount) <= 0 || isSubmitting} 
            className="w-full"
          >
            {isSubmitting ? "Processing..." : `Donate $${amount}`}
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Your donation helps keep CobraSave free and accessible to everyone.</p>
        <p>Thank you for your support!</p>
      </div>
    </div>
  );
}
