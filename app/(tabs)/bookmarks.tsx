// app/bookmarks.tsx
import React from 'react';
import { FlatList, Text, ActivityIndicator } from 'react-native';


import { useBookmarks } from '@/contexts/BookmarksContext';
import BookmarkCard from '@/components/ui/job/BookmarkCard';

export default function Bookmarks() {
  const { bookmarks, loading } = useBookmarks();

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;
  if (!bookmarks.length) return <Text style={{ padding: 20, backgroundColor: "white" }}>No bookmarks yet.</Text>;

  return (
    <FlatList
      data={bookmarks}
      keyExtractor={j => j.id.toString()}
      renderItem={({ item }) => (
        <BookmarkCard job={item} />
      )}
    />
  );
}
