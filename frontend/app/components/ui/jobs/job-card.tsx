"use client";

import { deleteJob } from "@/app/lib/jobs/actions";
import { JobProps } from "@/app/lib/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const JobCard = ({
  job,
  isCompact = false,
}: {
  job: JobProps;
  isCompact?: boolean;
}) => {
  const [message, setMessage] = useState<string | null>(null);

  const handleDeletePress = async () => {
    const deleteRes = await deleteJob(job.id!.toString());
    if (deleteRes.error) {
      setMessage(deleteRes.error.toString());
    }
  };

  if (isCompact) {
    return (
      <Card className="block w-full max-w-[40rem] mx-auto mb-3">
        <CardHeader className="flex flex-wrap justify-between">
          <div className="block">
            <p className="text-2xl font-bold">{job.title}</p>
            <p className="text-danger font-bold">{job.company}</p>
          </div>
          <div className="flex gap-2">
            <Button
              isIconOnly
              onPress={handleDeletePress}
              className="flex self-center w-14 h-full aspect-square items-center
            justify-around bg-transparent hover:bg-foreground-100 duration-300
            hover:text-danger text-foreground-700"
            >
              <FaTrash className="w-1/3 h-full" />
            </Button>
            <Button
              as={Link}
              isIconOnly
              href={`/job/${job.id}`}
              className="flex self-center w-14 h-full aspect-square items-center
            justify-around bg-transparent hover:bg-foreground-300 p-2 duration-300 text-foreground-700"
            >
              <FaChevronRight className="h-full" />
            </Button>
          </div>
        </CardHeader>
        {message && (
          <p className="text-danger text-center font-semibold">{message}</p>
        )}
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
