import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        toast({
          title: "Welcome!",
          description: "You've successfully logged in to MusicStream.",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  from-background via-music-surface to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md  border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-music-primary to-music-secondary rounded-2xl flex items-center justify-center">
            <img src="/chord-chain/public/player.png" />
          </div>
          <CardTitle className="text-purple-600  font-bold  ">
            MusicStream
          </CardTitle>
          <CardDescription>
            Sign in to access your music library
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-music-surface border-border/50 focus:border-music-primary"
                placeholder="Enter your username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-music-surface border-border/50 focus:border-music-primary"
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full  hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="pt-4 border-t border-border/20">
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-medium">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-music-surface rounded border border-border/30">
                  <p className="font-semibold text-music-secondary">Admin</p>
                  <p>admin / admin123</p>
                </div>
                <div className="p-2 bg-music-surface rounded border border-border/30">
                  <p className="font-semibold text-accent">User</p>
                  <p>user / user123</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
