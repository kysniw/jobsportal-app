import { JobType } from "@/app/lib/types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const JobCard = ({ job }: { job: JobType }) => {
  const jobDesc =
    job.description.length > 200
      ? job.description.slice(0, 200) + "..."
      : job.description;
  return (
    <Link
      href={`/job/${job.id}`}
      className="block scale-100 hover:scale-105 transition-transform
      max-w-[40rem] mx-auto mb-3"
    >
      <Card>
        <CardHeader className="block">
          <p className="text-2xl font-bold">{job.title}</p>
          <p className="text-danger font-medium">{job.company}</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{jobDesc}</p>
        </CardBody>
        <Divider />
        <CardFooter className="text-danger">{job.salary}</CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
