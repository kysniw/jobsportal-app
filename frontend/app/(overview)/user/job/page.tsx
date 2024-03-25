import JobCard from "@/app/components/ui/jobs/job-card";
import { getUserJobs } from "@/app/lib/data";
import { JobProps } from "@/app/lib/types";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

async function UserJobsPage() {
  const userJobs = await getUserJobs();
  // console.log(userJobs);

  if (userJobs.message) {
    return (
      <p className="h-full font-extrabold text-2xl mt-10">{userJobs.message}</p>
    );
  }

  const renderedUserJobs = userJobs.map((userJob: JobProps) => (
    <JobCard key={userJob.id} job={userJob} isCompact />
  ));

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-6">
      {renderedUserJobs ? renderedUserJobs : <p>Create your first offer!</p>}
      <Button size="lg" color="danger" as={Link} href="/user/job/create">
        Create offer
      </Button>
    </div>
  );
}

export default UserJobsPage;
