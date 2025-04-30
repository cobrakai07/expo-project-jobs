// src/context/BookmarksContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JobAPI } from '@/types/Job';

interface BookmarksContextValue {
  bookmarks: JobAPI[];
  loading: boolean;
  addBookmark: (job: JobAPI) => Promise<void>;
  removeBookmark: (jobId: number) => Promise<void>;
  isBookmarked: (jobId: number) => boolean;
  refreshBookmarks: () => Promise<void>;
}

const BookmarksContext = createContext<BookmarksContextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const BookmarksProvider: React.FC<Props> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<JobAPI[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshBookmarks = useCallback(async () => {
    setLoading(true);
    try {
      const keys = await AsyncStorage.getAllKeys();
      const bookmarkKeys = keys.filter(k => k.startsWith('bookmark_'));
      const values = await Promise.all(bookmarkKeys.map(k => AsyncStorage.getItem(k)));
      const parsed = values.filter(Boolean).map(v => JSON.parse(v!));
      setBookmarks(parsed);
    } catch (e) {
      console.error("Failed to load bookmarks:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBookmark = async (job: JobAPI) => {
    try {
      await AsyncStorage.setItem(`bookmark_${job.id}`, JSON.stringify(job));
      setBookmarks(prev => [...prev, job]);
      refreshBookmarks();
    } catch (e) {
      console.error("Failed to add bookmark:", e);
    }
  };

  const removeBookmark = async (jobId: number) => {
    try {
      await AsyncStorage.removeItem(`bookmark_${jobId}`);
      setBookmarks(prev => prev.filter(j => j.id !== jobId));
      refreshBookmarks();
    } catch (e) {
      console.error("Failed to remove bookmark:", e);
    }
  };

  const isBookmarked = (jobId: number): boolean => {
    return bookmarks.some(j => j.id === jobId);
  };

  useEffect(() => {
    refreshBookmarks();
  }, []);

  return (
    <BookmarksContext.Provider value={{ bookmarks, loading, addBookmark, removeBookmark, isBookmarked, refreshBookmarks }}>
      {children}
    </BookmarksContext.Provider>
  );
};

export function useBookmarks(): BookmarksContextValue {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}
