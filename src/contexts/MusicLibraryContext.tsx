import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Song, FilterOptions, SortOptions, GroupByOptions, MusicLibraryState } from '@/types/music';
import { loadSongsFromStorage, saveSongsToStorage } from '@/data/mockSongs';

interface MusicLibraryContextType extends MusicLibraryState {
  addSong: (song: Omit<Song, 'id'>) => void;
  deleteSong: (id: string) => void;
  updateFilters: (filters: Partial<FilterOptions>) => void;
  updateSort: (sort: SortOptions) => void;
  updateGroupBy: (groupBy: GroupByOptions) => void;
  clearFilters: () => void;
}

type MusicLibraryAction =
  | { type: 'SET_SONGS'; payload: Song[] }
  | { type: 'ADD_SONG'; payload: Song }
  | { type: 'DELETE_SONG'; payload: string }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterOptions> }
  | { type: 'UPDATE_SORT'; payload: SortOptions }
  | { type: 'UPDATE_GROUP_BY'; payload: GroupByOptions }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: MusicLibraryState = {
  songs: [],
  filteredSongs: [],
  filters: {
    search: '',
    album: '',
    artist: '',
    genre: ''
  },
  sort: {
    field: 'title',
    direction: 'asc'
  },
  groupBy: {
    field: 'none'
  },
  isLoading: false
};

const musicLibraryReducer = (
  state: MusicLibraryState,
  action: MusicLibraryAction
): MusicLibraryState => {
  switch (action.type) {
    case 'SET_SONGS':
      return {
        ...state,
        songs: action.payload,
        filteredSongs: applyFiltersAndSort(action.payload, state.filters, state.sort)
      };

    case 'ADD_SONG':
      const newSongs = [...state.songs, action.payload];
      return {
        ...state,
        songs: newSongs,
        filteredSongs: applyFiltersAndSort(newSongs, state.filters, state.sort)
      };

    case 'DELETE_SONG':
      const filteredSongs = state.songs.filter(song => song.id !== action.payload);
      return {
        ...state,
        songs: filteredSongs,
        filteredSongs: applyFiltersAndSort(filteredSongs, state.filters, state.sort)
      };

    case 'UPDATE_FILTERS':
      const newFilters = { ...state.filters, ...action.payload };
      return {
        ...state,
        filters: newFilters,
        filteredSongs: applyFiltersAndSort(state.songs, newFilters, state.sort)
      };

    case 'UPDATE_SORT':
      return {
        ...state,
        sort: action.payload,
        filteredSongs: applyFiltersAndSort(state.songs, state.filters, action.payload)
      };

    case 'UPDATE_GROUP_BY':
      return {
        ...state,
        groupBy: action.payload
      };

    case 'CLEAR_FILTERS':
      const clearedFilters = {
        search: '',
        album: '',
        artist: '',
        genre: ''
      };
      return {
        ...state,
        filters: clearedFilters,
        filteredSongs: applyFiltersAndSort(state.songs, clearedFilters, state.sort)
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

// Helper function to apply filters and sorting
const applyFiltersAndSort = (
  songs: Song[],
  filters: FilterOptions,
  sort: SortOptions
): Song[] => {
  let filtered = songs.filter(song => {
    const matchesSearch = !filters.search || 
      song.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      song.artist.toLowerCase().includes(filters.search.toLowerCase()) ||
      song.album.toLowerCase().includes(filters.search.toLowerCase());

    const matchesAlbum = !filters.album || song.album === filters.album;
    const matchesArtist = !filters.artist || song.artist === filters.artist;
    const matchesGenre = !filters.genre || song.genre === filters.genre;

    return matchesSearch && matchesAlbum && matchesArtist && matchesGenre;
  });

  // Apply sorting
  filtered.sort((a, b) => {
    const aValue = a[sort.field];
    const bValue = b[sort.field];
    
    let comparison = 0;
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    }

    return sort.direction === 'desc' ? -comparison : comparison;
  });

  return filtered;
};

const MusicLibraryContext = createContext<MusicLibraryContextType | undefined>(undefined);

export const MusicLibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(musicLibraryReducer, initialState);

  useEffect(() => {
    // Load songs from localStorage on mount
    const songs = loadSongsFromStorage();
    dispatch({ type: 'SET_SONGS', payload: songs });
  }, []);

  useEffect(() => {
    // Save songs to localStorage whenever songs change
    if (state.songs.length > 0) {
      saveSongsToStorage(state.songs);
    }
  }, [state.songs]);

  const addSong = (songData: Omit<Song, 'id'>) => {
    const song: Song = {
      ...songData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    dispatch({ type: 'ADD_SONG', payload: song });
  };

  const deleteSong = (id: string) => {
    dispatch({ type: 'DELETE_SONG', payload: id });
  };

  const updateFilters = (filters: Partial<FilterOptions>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: filters });
  };

  const updateSort = (sort: SortOptions) => {
    dispatch({ type: 'UPDATE_SORT', payload: sort });
  };

  const updateGroupBy = (groupBy: GroupByOptions) => {
    dispatch({ type: 'UPDATE_GROUP_BY', payload: groupBy });
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const contextValue: MusicLibraryContextType = {
    ...state,
    addSong,
    deleteSong,
    updateFilters,
    updateSort,
    updateGroupBy,
    clearFilters
  };

  return (
    <MusicLibraryContext.Provider value={contextValue}>
      {children}
    </MusicLibraryContext.Provider>
  );
};

export const useMusicLibrary = (): MusicLibraryContextType => {
  const context = useContext(MusicLibraryContext);
  if (!context) {
    throw new Error('useMusicLibrary must be used within a MusicLibraryProvider');
  }
  return context;
};