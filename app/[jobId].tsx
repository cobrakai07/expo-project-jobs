// app/jobs/[jobId].tsx
import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useLocalSearchParams,  } from 'expo-router';
import { JobAPI } from '@/types/Job';
import { fetchJobs } from '@/api/jobApi';



export default function JobDetail() {
    const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const [job, setJob] = React.useState<JobAPI|null>(null);
console.log(jobId);

  React.useEffect(() => {
    (async () => {
      const page1 = await fetchJobs(1);
   
      const found = page1.find(j => j.id === Number(jobId));
      setJob(found || null);
    })();
  }, [jobId]);

  if (!job) return <Text style={{padding:20}}>Loading…</Text>;

  return (
    <ScrollView style={{ padding:16 ,backgroundColor:"white"}}>
      <Text style={{ fontSize:20, fontWeight:'bold' }}>{job.title}</Text>
      <Text>Location: {job.primary_details.Place}</Text>
      <Text>Salary: {job.primary_details.Salary}</Text>
      <Text>Experience: {job.primary_details.Experience}</Text>
      <Text>Call: {job.whatsapp_no}</Text>
      {/* Add more fields as needed */}
    </ScrollView>
  );
}
