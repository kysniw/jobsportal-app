import React from "react";
import JobCard from "./job-card";
import { getAllJobs } from "@/app/lib/data";
import { JobType } from "@/app/lib/types";
import { ReadonlyURLSearchParams } from "next/navigation";

const JobsList = async ({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) => {
  const data = await getAllJobs(searchParams);

  if (data.message) {
    return (
      <p className="h-full font-extrabold text-2xl mt-10">{data.message}</p>
    );
  }

  const renderedJobs = data.jobsProps?.jobs.map((job: JobType) => {
    // console.log(job);
    return <JobCard key={job.id} job={job} />;
  });

  return (
    <div>
      {data.jobsProps?.jobs.length !== 0 ? (
        renderedJobs
      ) : (
        <p className="block w-[40rem] text-center text-xl mt-10">
          There is no offer for you
        </p>
      )}
    </div>
  );
};

export default JobsList;
