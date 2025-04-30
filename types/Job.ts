// src/types.ts
export interface PrimaryDetails {
  Place: string;
  Salary: string;
  Job_Type: string;
  Experience: string;
  Fees_Charged: string;
  Qualification: string;
}

export interface JobAPI {
  id: number;
  title: string;
  primary_details: PrimaryDetails;
  whatsapp_no: string;
  bookmarked: boolean
  // …other fields as needed
}

// Runtime check to filter out malformed entries:
export function isValidJob(obj: any): obj is JobAPI {
  return (
    typeof obj?.id === 'number' &&
    typeof obj?.title === 'string' &&
    obj.primary_details != null &&
    typeof obj.primary_details.Place === 'string' &&
    typeof obj.whatsapp_no === 'string'
  );
}
