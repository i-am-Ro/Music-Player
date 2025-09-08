import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useMusicLibrary } from "@/contexts/MusicLibraryContext";
import { Search, X, Filter, ArrowUpDown } from "lucide-react";

const MusicFilters: React.FC = () => {
  const {
    songs,
    filters,
    sort,
    groupBy,
    updateFilters,
    updateSort,
    updateGroupBy,
    clearFilters,
  } = useMusicLibrary();

  const uniqueAlbums = [...new Set(songs.map((song) => song.album))].sort();
  const uniqueArtists = [...new Set(songs.map((song) => song.artist))].sort();
  const uniqueGenres = [...new Set(songs.map((song) => song.genre))].sort();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: e.target.value });
  };

  const handleSortChange = (field: string) => {
    const newDirection =
      sort.field === field && sort.direction === "asc" ? "desc" : "asc";
    updateSort({ field: field as any, direction: newDirection });
  };

  const hasActiveFilters =
    filters.search || filters.album || filters.artist || filters.genre;

  return (
    <Card className="bg-music-card border-border/30 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-music-primary" />
          <h3 className="text-lg font-semibold">Filter & Sort</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search songs, artists, albums..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-10 bg-music-surface border-border/50 focus:border-music-primary"
            />
          </div>

          <Select
            value={filters.artist}
            onValueChange={(value) =>
              updateFilters({ artist: value === "all" ? "" : value })
            }
          >
            <SelectTrigger className="bg-music-surface border-border/50">
              <SelectValue placeholder="All Artists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Artists</SelectItem>
              {uniqueArtists.map((artist) => (
                <SelectItem key={artist} value={artist}>
                  {artist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.album}
            onValueChange={(value) =>
              updateFilters({ album: value === "all" ? "" : value })
            }
          >
            <SelectTrigger className="bg-music-surface border-border/50">
              <SelectValue placeholder="All Albums" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Albums</SelectItem>
              {uniqueAlbums.map((album) => (
                <SelectItem key={album} value={album}>
                  {album}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.genre}
            onValueChange={(value) =>
              updateFilters({ genre: value === "all" ? "" : value })
            }
          >
            <SelectTrigger className="bg-music-surface border-border/50">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {uniqueGenres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/20">
          <div>
            <label className="text-sm font-medium mb-2  items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort by
            </label>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "title", label: "Title" },
                { key: "artist", label: "Artist" },
                { key: "album", label: "Album" },
                { key: "year", label: "Year" },
                { key: "duration", label: "Duration" },
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={sort.field === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleSortChange(key)}
                  className={
                    sort.field === key ? "bg-music-primary text-white" : ""
                  }
                >
                  {label}
                  {sort.field === key && (
                    <span className="ml-1 text-xs">
                      {sort.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Group by</label>
            <Select
              value={groupBy.field}
              onValueChange={(value) => updateGroupBy({ field: value as any })}
            >
              <SelectTrigger className="bg-music-surface border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Grouping</SelectItem>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="album">Album</SelectItem>
                <SelectItem value="genre">Genre</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicFilters;
