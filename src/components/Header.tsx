import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Shield } from "lucide-react";

const Header: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="bg-music-card border-b border-border/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-music-primary to-music-secondary rounded-xl flex items-center justify-center">
            <img src="/public/player.png" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
              MusicStream
            </h1>
            <p className="text-xs text-muted-foreground">
              Your Personal Music Library
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2 px-3 py-2 bg-music-surface rounded-lg border border-border/30">
              {isAdmin ? (
                <Shield className="w-4 h-4 text-music-secondary" />
              ) : (
                <User className="w-4 h-4 text-accent" />
              )}
              <span className="text-sm font-medium">{user.username}</span>
              <span className="text-xs px-2 py-1 bg-music-primary/20 text-music-primary rounded-full">
                {user.role}
              </span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="border-border/50 "
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
