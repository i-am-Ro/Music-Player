export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  genre: string;
  year: number;
  coverUrl?: string;
  audioUrl?: string;
}

export interface FilterOptions {
  search: string;
  album: string;
  artist: string;
  genre: string;
}

export interface SortOptions {
  field: 'title' | 'artist' | 'album' | 'year' | 'duration';
  direction: 'asc' | 'desc';
}

export interface GroupByOptions {
  field: 'none' | 'album' | 'artist' | 'genre' | 'year';
}

export interface MusicLibraryState {
  songs: Song[];
  filteredSongs: Song[];
  filters: FilterOptions;
  sort: SortOptions;
  groupBy: GroupByOptions;
  isLoading: boolean;
}