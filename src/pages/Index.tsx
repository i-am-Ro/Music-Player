import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MusicLibraryProvider } from "@/contexts/MusicLibraryContext";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import MicroFrontendLoader from "@/components/MicroFrontendLoader";
import MusicPlayer from "@/components/music/MusicPlayer";

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <MusicPlayerProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-music-surface to-background pb-24">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <MusicLibraryProvider>
            <MicroFrontendLoader
              appName="music-library"
              url="http://localhost:3001/remoteEntry.js"
            />
          </MusicLibraryProvider>
        </main>
        <MusicPlayer />
      </div>
    </MusicPlayerProvider>
  );
};

export default Index;
