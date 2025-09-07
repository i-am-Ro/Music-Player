import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMusicLibrary } from "@/contexts/MusicLibraryContext";
import { useAuth } from "@/contexts/AuthContext";
import { Song } from "@/types/music";
import SongCard from "./SongCard";
import MusicFilters from "./MusicFilters";
import AddSongForm from "./AddSongForm";
import { Music2, Users, Disc, Calendar, Hash } from "lucide-react";

const MusicLibrary: React.FC = () => {
  const { filteredSongs, groupBy, isLoading } = useMusicLibrary();
  const { isAdmin } = useAuth();

  const groupedSongs = useMemo(() => {
    if (groupBy.field === "none") {
      return { "All Songs": filteredSongs };
    }

    return filteredSongs.reduce((groups, song) => {
      const key = song[groupBy.field];
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(song);
      return groups;
    }, {} as Record<string, Song[]>);
  }, [filteredSongs, groupBy.field]);

  const stats = useMemo(() => {
    const totalSongs = filteredSongs.length;
    const totalArtists = new Set(filteredSongs.map((song) => song.artist)).size;
    const totalAlbums = new Set(filteredSongs.map((song) => song.album)).size;
    const totalDuration = filteredSongs.reduce(
      (total, song) => total + song.duration,
      0
    );

    return { totalSongs, totalArtists, totalAlbums, totalDuration };
  }, [filteredSongs]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getGroupIcon = (field: string) => {
    switch (field) {
      case "artist":
        return <Users className="w-4 h-4" />;
      case "album":
        return <Disc className="w-4 h-4" />;
      case "genre":
        return <Music2 className="w-4 h-4" />;
      case "year":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Hash className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-music-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your music library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats and Actions */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-music-primary to-music-secondary bg-clip-text text-transparent">
            Music Library
          </h2>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Music2 className="w-4 h-4" />
              {stats.totalSongs} songs
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {stats.totalArtists} artists
            </div>
            <div className="flex items-center gap-1">
              <Disc className="w-4 h-4" />
              {stats.totalAlbums} albums
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDuration(stats.totalDuration)} total
            </div>
          </div>
        </div>

        {isAdmin && <AddSongForm />}
      </div>

      {/* Filters */}
      <MusicFilters />

      {/* Songs Display */}
      {filteredSongs.length === 0 ? (
        <Card className="bg-music-card border-border/30">
          <CardContent className="py-12 text-center">
            <Music2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No songs found</h3>
            <p className="text-muted-foreground mb-4">
              {isAdmin
                ? "Try adjusting your filters or add some new songs to get started."
                : "Try adjusting your filters to find what you're looking for."}
            </p>
            {isAdmin && <AddSongForm />}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSongs).map(([groupName, songs]) => (
            <div key={groupName}>
              {groupBy.field !== "none" && (
                <div className="flex items-center gap-3 mb-4">
                  {getGroupIcon(groupBy.field)}
                  <h3 className="text-xl font-semibold">{groupName}</h3>
                  <Badge
                    variant="secondary"
                    className="bg-music-surface text-music-primary border-border/30"
                  >
                    {songs.length} song{songs.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {songs.map((song) => (
                  <SongCard key={song.id} song={song} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicLibrary;
