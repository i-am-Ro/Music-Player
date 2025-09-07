import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song } from '@/types/music';

interface MusicPlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playlist: Song[];
  currentIndex: number;
}

interface MusicPlayerContextType extends MusicPlayerState {
  play: (song?: Song) => void;
  pause: () => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlaylist: (songs: Song[], startIndex?: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

const initialState: MusicPlayerState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  isMuted: false,
  playlist: [],
  currentIndex: -1
};

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MusicPlayerState>(initialState);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update current time during playback
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0
      }));
    };

    const handleLoadedMetadata = () => {
      setState(prev => ({
        ...prev,
        duration: audio.duration || 0
      }));
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [state.currentSong]);

  // Update audio element when song changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !state.currentSong) return;

    audio.src = state.currentSong.audioUrl || '';
    audio.volume = state.isMuted ? 0 : state.volume;
    
    if (state.isPlaying) {
      audio.play().catch(console.error);
    }
  }, [state.currentSong]);

  // Update volume
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = state.isMuted ? 0 : state.volume;
  }, [state.volume, state.isMuted]);

  const play = (song?: Song) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (song) {
      // Playing a new song
      setState(prev => {
        const newIndex = prev.playlist.findIndex(s => s.id === song.id);
        return {
          ...prev,
          currentSong: song,
          isPlaying: true,
          currentIndex: newIndex !== -1 ? newIndex : prev.currentIndex,
          currentTime: 0
        };
      });
    } else if (state.currentSong) {
      // Resume current song
      setState(prev => ({ ...prev, isPlaying: true }));
      audio.play().catch(console.error);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setState(prev => ({ ...prev, isPlaying: false }));
    audio.pause();
  };

  const togglePlayPause = () => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  };

  const setVolume = (volume: number) => {
    setState(prev => ({ ...prev, volume }));
  };

  const toggleMute = () => {
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const playNext = () => {
    if (state.playlist.length === 0 || state.currentIndex === -1) return;

    const nextIndex = (state.currentIndex + 1) % state.playlist.length;
    const nextSong = state.playlist[nextIndex];
    
    setState(prev => ({
      ...prev,
      currentSong: nextSong,
      currentIndex: nextIndex,
      currentTime: 0
    }));
  };

  const playPrevious = () => {
    if (state.playlist.length === 0 || state.currentIndex === -1) return;

    const prevIndex = state.currentIndex === 0 ? state.playlist.length - 1 : state.currentIndex - 1;
    const prevSong = state.playlist[prevIndex];
    
    setState(prev => ({
      ...prev,
      currentSong: prevSong,
      currentIndex: prevIndex,
      currentTime: 0
    }));
  };

  const setPlaylist = (songs: Song[], startIndex = 0) => {
    setState(prev => ({
      ...prev,
      playlist: songs,
      currentIndex: startIndex,
      currentSong: songs[startIndex] || null
    }));
  };

  const contextValue: MusicPlayerContextType = {
    ...state,
    play,
    pause,
    togglePlayPause,
    seekTo,
    setVolume,
    toggleMute,
    playNext,
    playPrevious,
    setPlaylist,
    audioRef
  };

  return (
    <MusicPlayerContext.Provider value={contextValue}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = (): MusicPlayerContextType => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};