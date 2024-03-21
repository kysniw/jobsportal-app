import React from "react";
import JobCard from "./job-card";
import { getAllJobs } from "@/app/lib/data";
import { JobProps } from "@/app/lib/types";
import { ReadonlyURLSearchParams } from "next/navigation";
import JobsPagination from "./pagination";

const JobsList = async ({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
  isCompact?: boolean;
}) => {
  const data = await getAllJobs(searchParams);

  if (data.message) {
    return (
      <p className="h-full font-extrabold text-2xl mt-10">{data.message}</p>
    );
  }

  const totalPageCount = Math.ceil(
    data.jobsProps!.count / data.jobsProps!.pageSize
  );

  const renderedJobs = data.jobsProps?.jobs.map((job: JobProps) => {
    // console.log(job);
    return <JobCard key={job.id} job={job} />;
  });

  return (
    <div className="min-h-full flex flex-col items-center">
      {data.jobsProps?.jobs.length !== 0 ? (
        renderedJobs
      ) : (
        <p className="block w-[40rem] text-center text-xl mt-10">
          There is no offer for you
        </p>
      )}

      <JobsPagination totalNumber={totalPageCount} />
    </div>
  );
};

export default JobsList;
