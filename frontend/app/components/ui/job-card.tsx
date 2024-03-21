import { JobProps } from "@/app/lib/types";
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
import { FaChevronRight } from "react-icons/fa";

const JobCard = ({
  job,
  isCompact = false,
}: {
  job: JobProps;
  isCompact?: boolean;
}) => {
  if (isCompact) {
    return (
      <Card className="block w-full max-w-[40rem] mx-auto mb-3">
        <CardHeader className="flex justify-between">
          <div className="block">
            <p className="text-2xl font-bold">{job.title}</p>
            <p className="text-danger font-bold">{job.company}</p>
          </div>
          <Link
            href={`/job/${job.id}`}
            className="flex self-center max-w-14 w-full aspect-square items-center
            justify-around hover:bg-foreground-300 rounded-lg p-2 duration-300 text-foreground-700"
          >
            <FaChevronRight className=" h-full" />
          </Link>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card
      as={Link}
      href={`/job/${job.id}`}
      className="block scale-100 hover:scale-105 transition-transform
      max-w-[40rem] w-full mx-auto mb-3"
    >
      <CardHeader className="block">
        <p className="text-2xl font-bold">{job.title}</p>
        <p className="text-danger font-bold">{job.company}</p>
      </CardHeader>
      <Divider />
      <CardBody>
        <ScrollShadow className="max-h-24 overflow-hidden">
          <p className=" whitespace-pre-wrap">{job.description}</p>
        </ScrollShadow>
      </CardBody>
      <Divider />
      <CardFooter className="text-danger font-semibold flex flex-wrap gap-2">
        <Chip>${job.salary}</Chip>
        <Chip>{job.jobType}</Chip>
        <Chip>{job.education}</Chip>
        <Chip>{job.industry}</Chip>
        <Chip>{job.experience}</Chip>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
