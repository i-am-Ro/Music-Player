import { Song } from "@/types/music";

export const mockSongs: Song[] = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: 355, // 5:55
    genre: "Rock",
    year: 1975,
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    duration: 482, // 8:02
    genre: "Rock",
    year: 1971,
    coverUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: 391, // 6:31
    genre: "Rock",
    year: 1976,
    coverUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    duration: 183, // 3:03
    genre: "Pop",
    year: 1971,
    coverUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: 294, // 4:54
    genre: "Pop",
    year: 1982,
    coverUrl:
      "https://images.unsplash.com/photo-1548502632-6b93092aad0b?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    id: "6",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    duration: 301, // 5:01
    genre: "Grunge",
    year: 1991,
    coverUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    id: "7",
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    duration: 356, // 5:56
    genre: "Rock",
    year: 1987,
    coverUrl:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: "8",
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    duration: 369, // 6:09
    genre: "Folk Rock",
    year: 1965,
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: "9",
    title: "Purple Haze",
    artist: "Jimi Hendrix",
    album: "Are You Experienced",
    duration: 167, // 2:47
    genre: "Psychedelic Rock",
    year: 1967,
    coverUrl:
      "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: "10",
    title: "Good Vibrations",
    artist: "The Beach Boys",
    album: "Smiley Smile",
    duration: 219, // 3:39
    genre: "Pop Rock",
    year: 1966,
    coverUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
  {
    id: "11",
    title: "Yesterday",
    artist: "The Beatles",
    album: "Help!",
    duration: 125, // 2:05
    genre: "Pop",
    year: 1965,
    coverUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  },
  {
    id: "12",
    title: "What's Going On",
    artist: "Marvin Gaye",
    album: "What's Going On",
    duration: 233, // 3:53
    genre: "Soul",
    year: 1971,
    coverUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
  },
];

// Storage functions for persistence
export const loadSongsFromStorage = (): Song[] => {
  try {
    const stored = localStorage.getItem("music_library_songs");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading songs from storage:", error);
  }
  return mockSongs;
};

export const saveSongsToStorage = (songs: Song[]): void => {
  try {
    localStorage.setItem("music_library_songs", JSON.stringify(songs));
  } catch (error) {
    console.error("Error saving songs to storage:", error);
  }
};
