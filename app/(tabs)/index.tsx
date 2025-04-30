import React from 'react';
import { FlatList, ActivityIndicator, Text, Pressable } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

import { useJobs } from '@/contexts/JobsContext';
import JobCard from '@/components/ui/job/JobCard';
import { useBookmarks } from '@/contexts/BookmarksContext';


export default function JobsScreen() {
  const { jobs, loading, error, loadMore, refresh } = useJobs();
  const { refreshBookmarks} = useBookmarks();
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      refresh();             // Re-fetch jobs
      refreshBookmarks();    // Re-fetch bookmark status
    }, [refresh, refreshBookmarks])
  );
  

  if (error) return <Text>Error: {error}</Text>;
  if (!jobs.length && loading) return <ActivityIndicator />;

  return (
    <FlatList
      data={jobs}
      keyExtractor={j => j.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/${item.id}`)}>
        <JobCard job={item}  />
        </Pressable>
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
      contentContainerStyle={{ paddingBottom: 200 }} 
    />
  );
}
