import React from "react";
import JobCard from "./jobcard";
import { getAllJobs } from "@/app/lib/data";

const JobsList = async () => {
  const data = await getAllJobs();
  const renderedJobs = data.props.jobs.jobs.map((job: any) => {
    console.log(job);
    return <JobCard key={job.id} job={job} />;
  });

  return <div>{renderedJobs}</div>;
};

export default JobsList;
