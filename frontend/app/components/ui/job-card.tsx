import { JobType } from "@/app/lib/types";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const JobCard = ({ job }: { job: JobType }) => {
  const jobDescLines = job.description.split("\r\n");

  return (
    <Card
      as={Link}
      href={`/job/${job.id}`}
      className="block scale-100 hover:scale-105 transition-transform
      max-w-[40rem] mx-auto mb-3"
    >
      <CardHeader className="block">
        <p className="text-2xl font-bold">{job.title}</p>
        <p className="text-danger font-bold">{job.company}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <ScrollShadow className="max-h-24 overflow-hidden">
          <p>
            {jobDescLines.map((descLine) => (
              <>
                {descLine}
                <br />
              </>
            ))}
          </p>
        </ScrollShadow>
      </CardBody>
      <Divider />
      <CardFooter className="text-danger font-semibold flex flex-wrap gap-2">
        <Chip>${job.salary}</Chip>
        <Chip>{job.job_type}</Chip>
        <Chip>{job.education}</Chip>
        <Chip>{job.industry}</Chip>
        <Chip>{job.experience}</Chip>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
