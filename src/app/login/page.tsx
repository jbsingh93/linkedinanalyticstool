/**
 * Login Page Component
 * 
 * A simple UI-only login form without active authentication.
 * This page displays a card with email and password fields and a login button.
 * Currently just a mock implementation for UI demonstration.
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  // State for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Mock login function - in a real app, this would validate credentials with Supabase
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation to ensure fields aren't empty
    if (email && password) {
      // In a real app, we would authenticate with Supabase here
      // For now, just redirect to the dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-112px)] bg-neutral-50">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            {/* Email input field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="youremail@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Password input field */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
          </CardContent>
          
          <CardFooter>
            {/* Submit button with mock login functionality */}
            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
