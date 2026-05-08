import { JobForm } from "@/components/jobs/job-form";

export const metadata = {
  title: "Create Job Listing",
};

export default function CreateJobPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <JobForm />
    </div>
  );
}
