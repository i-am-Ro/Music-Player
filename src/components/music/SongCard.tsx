import React from "react";
import { Song } from "@/types/music";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useMusicLibrary } from "@/contexts/MusicLibraryContext";
import { useMusicPlayer } from "@/contexts/MusicPlayerContext";
import { Play, Pause, Trash2, Clock, Calendar, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SongCardProps {
  song: Song;
}

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { isAdmin } = useAuth();
  const { deleteSong, filteredSongs } = useMusicLibrary();
  const { currentSong, isPlaying, play, pause, setPlaylist } = useMusicPlayer();
  const { toast } = useToast();

  const isCurrentSong = currentSong?.id === song.id;
  const isCurrentlyPlaying = isCurrentSong && isPlaying;

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isCurrentSong) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      // Set current filtered songs as playlist and play selected song
      const songIndex = filteredSongs.findIndex((s) => s.id === song.id);
      setPlaylist(filteredSongs, songIndex);
      play(song);

      toast({
        title: "Now playing",
        description: `"${song.title}" by ${song.artist}`,
      });
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSong(song.id);
    toast({
      title: "Song deleted",
      description: `"${song.title}" by ${song.artist} has been removed from the library.`,
    });
  };

  return (
    <Card
      className={`group bg-music-card hover:bg-music-card-hover border-border/30 transition-all duration-300 hover:shadow-lg hover:shadow-music-primary/10 ${
        isCurrentSong ? "ring-2 ring-music-primary ring-opacity-50" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-music-primary/20 to-music-secondary/20 rounded-lg overflow-hidden border border-border/20">
              {song.coverUrl ? (
                <img
                  src={song.coverUrl}
                  alt={`${song.album} cover`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-music-primary/60" />
                </div>
              )}
            </div>
            <Button
              size="sm"
              onClick={handlePlayPause}
              className={`absolute inset-0 bg-black/60 hover:bg-black/70 text-white transition-opacity duration-200 ${
                isCurrentSong && !isPlaying
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              {isCurrentlyPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold truncate transition-colors ${
                isCurrentSong
                  ? "text-music-primary"
                  : "text-foreground group-hover:text-music-primary"
              }`}
            >
              {song.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {song.artist}
            </p>
            <p className="text-xs text-muted-foreground/80 truncate">
              {song.album}
            </p>

            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground/60">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDuration(song.duration)}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {song.year}
              </div>
              <span className="px-2 py-0.5 bg-music-surface rounded-full text-xs border border-border/20">
                {song.genre}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-1">
            {isCurrentlyPlaying && (
              <div className="flex items-center gap-1 text-xs text-music-primary mr-2">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-3 bg-music-primary animate-pulse rounded-full" />
                  <div
                    className="w-0.5 h-4 bg-music-primary animate-pulse rounded-full"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-0.5 h-2 bg-music-primary animate-pulse rounded-full"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            )}

            {isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCard;
