import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    ReactNode,
  } from 'react';
  import { JobAPI } from '@/types/Job';
  import { fetchJobs } from '@/api/jobApi';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  type JobWithBookmark = JobAPI & { bookmarked: boolean };
  
  interface JobsContextValue {
    jobs: JobWithBookmark[];
    loading: boolean;
    error: string | null;
    loadMore: () => Promise<void>;
    refresh: () => Promise<void>;
    updateBookmarkStatus: () => Promise<void>;
  }
  
  const JobsContext = createContext<JobsContextValue | undefined>(undefined);
  
  interface JobsProviderProps {
    children: ReactNode;
  }
  
  export const JobsProvider: React.FC<JobsProviderProps> = ({ children }) => {
    const [jobs, setJobs] = useState<JobWithBookmark[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const getBookmarkedIds = async (): Promise<Set<number>> => {
      const keys = await AsyncStorage.getAllKeys();
      const bookmarkKeys = keys.filter(k => k.startsWith('bookmark_'));
      const ids = bookmarkKeys.map(k => parseInt(k.replace('bookmark_', ''), 10));
      return new Set(ids);
    };
  
    const mapJobsWithBookmarks = async (jobs: JobAPI[]): Promise<JobWithBookmark[]> => {
      const bookmarkedIds = await getBookmarkedIds();
      return jobs.map(job => ({
        ...job,
        bookmarked: bookmarkedIds.has(job.id),
      }));
    };
  
    const loadMore = useCallback(async () => {
        if (loading || page > 4) return; 
      setLoading(true);
      try {
        const newJobs = await fetchJobs(page);
        const mappedJobs = await mapJobsWithBookmarks(newJobs);
        setJobs(prev => [...prev, ...mappedJobs]);
        setPage(p => p + 1);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, [page, loading]);
  
    const refresh = useCallback(async () => {
      setLoading(true);
      setPage(1);
      try {
        const fresh = await fetchJobs(1);
        const mappedJobs = await mapJobsWithBookmarks(fresh);
        setJobs(mappedJobs);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }, []);
  
    const updateBookmarkStatus = useCallback(async () => {
      const updated = await Promise.all(
        jobs.map(async job => {
          const isBookmarked = await AsyncStorage.getItem(`bookmark_${job.id}`);
          return { ...job, bookmarked: !!isBookmarked };
        })
      );
      console.log(updated," kkkkk\n");
      
      setJobs(updated);
    }, [jobs]);
  
    useEffect(() => {
      loadMore();
    }, []);
  
    return (
      <JobsContext.Provider value={{ jobs, loading, error, loadMore, refresh, updateBookmarkStatus }}>
        {children}
      </JobsContext.Provider>
    );
  };
  
  export function useJobs(): JobsContextValue {
    const context = useContext(JobsContext);
    if (!context) {
      throw new Error('useJobs must be used within a JobsProvider');
    }
    return context;
  }
  