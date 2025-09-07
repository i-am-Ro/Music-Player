import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMusicLibrary } from "@/contexts/MusicLibraryContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Music } from "lucide-react";

const AddSongForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    genre: "",
    year: "",
    coverUrl: "",
    audioUrl: "",
  });

  const { addSong } = useMusicLibrary();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.artist || !formData.album) {
      toast({
        title: "Required fields missing",
        description: "Please fill in at least title, artist, and album.",
        variant: "destructive",
      });
      return;
    }

    const durationInSeconds = formData.duration
      ? parseInt(formData.duration) * 60
      : 180; // Default 3 minutes if not specified

    addSong({
      title: formData.title,
      artist: formData.artist,
      album: formData.album,
      duration: durationInSeconds,
      genre: formData.genre || "Unknown",
      year: formData.year ? parseInt(formData.year) : new Date().getFullYear(),
      coverUrl: formData.coverUrl || undefined,
      audioUrl: formData.audioUrl || undefined,
    });

    toast({
      title: "Song added!",
      description: `"${formData.title}" by ${formData.artist} has been added to the library.`,
    });

    // Reset form
    setFormData({
      title: "",
      artist: "",
      album: "",
      duration: "",
      genre: "",
      year: "",
      coverUrl: "",
      audioUrl: "",
    });

    setIsOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const genres = [
    "Rock",
    "Pop",
    "Jazz",
    "Blues",
    "Classical",
    "Hip-Hop",
    "Electronic",
    "Country",
    "Folk",
    "Reggae",
    "Punk",
    "Metal",
    "Alternative",
    "Indie",
    "R&B",
    "Soul",
    "Funk",
    "Disco",
    "Gospel",
    "World",
    "Ambient",
    "Experimental",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-music-primary to-music-secondary hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 mr-2" />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-music-card border-border/50 max-w-s">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Music className="w-5 h-5 text-music-primary" />
            Add New Song
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-music-surface border-border/50 focus:border-music-primary"
              placeholder="Song title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="artist">Artist *</Label>
            <Input
              id="artist"
              value={formData.artist}
              onChange={(e) => handleInputChange("artist", e.target.value)}
              className="bg-music-surface border-border/50 focus:border-music-primary"
              placeholder="Artist name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="album">Album *</Label>
            <Input
              id="album"
              value={formData.album}
              onChange={(e) => handleInputChange("album", e.target.value)}
              className="bg-music-surface border-border/50 focus:border-music-primary"
              placeholder="Album name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="bg-music-surface border-border/50 focus:border-music-primary"
                placeholder="3"
                min="1"
                max="60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                className="bg-music-surface border-border/50 focus:border-music-primary"
                placeholder="2024"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select
              value={formData.genre}
              onValueChange={(value) => handleInputChange("genre", value)}
            >
              <SelectTrigger className="bg-music-surface border-border/50">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverUrl">Cover Image URL (optional)</Label>
            <Input
              id="coverUrl"
              type="url"
              value={formData.coverUrl}
              onChange={(e) => handleInputChange("coverUrl", e.target.value)}
              className="bg-music-surface border-border/50 focus:border-music-primary"
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audioUrl">Audio File URL (optional)</Label>
            <Input
              id="audioUrl"
              type="url"
              value={formData.audioUrl}
              onChange={(e) => handleInputChange("audioUrl", e.target.value)}
              className="bg-music-surface border-border/50 focus:border-music-primary"
              placeholder="https://example.com/song.mp3"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-border/50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-music-primary to-music-secondary hover:opacity-90"
            >
              Add Song
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongForm;
