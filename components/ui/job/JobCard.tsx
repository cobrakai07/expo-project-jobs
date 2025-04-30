import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JobAPI } from '@/types/Job';
import { useBookmarks } from '@/contexts/BookmarksContext';
import { useJobs } from '@/contexts/JobsContext';


type Props = {
  job: JobAPI;
};

// Stateless functional component without forwardRef
const JobCard: React.FC<Props> = ({ job }) => {
  const { refreshBookmarks} = useBookmarks();
   const { updateBookmarkStatus } = useJobs();
  const [bookmarked, setBookmarked] = useState(false);
  const onPress=()=>{

  }
  useEffect(() => {
    AsyncStorage.getItem(`bookmark_${job.id}`).then(val => setBookmarked(!!val));
  }, [job.id]);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await AsyncStorage.removeItem(`bookmark_${job.id}`);
      setBookmarked(false);
    } else {
      await AsyncStorage.setItem(`bookmark_${job.id}`, JSON.stringify(job));
      setBookmarked(true);
    }
    refreshBookmarks();
    updateBookmarkStatus();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: 16, borderBottomWidth: 1 }}
    >
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{job.title}</Text>
      <Text>
        {job.primary_details.Place} • {job.primary_details.Salary}
      </Text>
      <Text>📞 {job.whatsapp_no}</Text>
      <TouchableOpacity onPress={toggleBookmark} style={{ marginTop: 8 }}>
        <Text style={{ color: job.bookmarked ? 'gold' : 'gray' }}>
          {job.bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default JobCard;
