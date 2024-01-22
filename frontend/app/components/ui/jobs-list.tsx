import React from "react";
import JobCard from "./job-card";
import { getAllJobs } from "@/app/lib/data";
import { JobType } from "@/app/lib/types";

const JobsList = async () => {
  const data = await getAllJobs();

  if (data.message) {
    return (
      <p className=" h-full font-extrabold text-2xl mt-10">{data.message}</p>
    );
  }

  const renderedJobs = data.jobsProps?.jobs.map((job: JobType) => {
    // console.log(job);
    return <JobCard key={job.id} job={job} />;
  });

  return <div>{renderedJobs}</div>;
};

export default JobsList;
