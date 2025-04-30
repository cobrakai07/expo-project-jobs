// src/api/jobs.ts

import { isValidJob, JobAPI } from "@/types/Job";


const BASE_URL = 'https://testapi.getlokalapp.com/common/jobs';

export async function fetchJobs(page: number): Promise<JobAPI[]> {
  const res = await fetch(`${BASE_URL}?page=${page}`);
  const json = await res.json();
  if (!Array.isArray(json.results)) throw new Error('Unexpected API format');
  // Filter invalid entries at runtime:
  return json.results.filter(isValidJob);
}
