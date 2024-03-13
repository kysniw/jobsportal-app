import { getJobById } from "@/app/lib/data";
import { JobType } from "@/app/lib/types";
import React from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { LatLngExpression } from "leaflet";
import JobTable from "@/app/components/ui/job-table";
import { dataDistanceToNow } from "@/app/utils/common";

const Map = dynamic(() => import("@/app/components/ui/map"), { ssr: false });

const JobPage = async ({ params }: { params: { id: string } }) => {
  const data = await getJobById(params.id);

  if (data.message)
    return (
      <p className="h-full font-extrabold text-2xl mt-10">{data.message}</p>
    );

  if (data.detail) notFound();
  console.log(data);

  const job = data as JobType;

  const position = [job.lat, job.lng] as LatLngExpression;

  return (
    <div className="mx-auto max-w-screen-lg flex flex-col lg:flex-row lg:items-start gap-4 mb-4">
      <Card className="flex-1">
        <CardHeader className="block">
          <h1 className="text-3xl font-extrabold">{job.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <Chip>{job.company}</Chip>
            <Chip>{job.jobType}</Chip>
            <Chip>{job.email}</Chip>
          </div>
        </CardHeader>
        <CardBody>
          <p className="whitespace-pre-wrap">{job.description}</p>
        </CardBody>
        <JobTable job={job} />
        <CardFooter>
          <p>{dataDistanceToNow(job.createdAt, true)}</p>
          <p>{dataDistanceToNow(job.lastDate, true)}</p>
        </CardFooter>
        <Button color="danger" className="m-10 text-lg font-bold">
          Apply
        </Button>
      </Card>
      <Card
        isFooterBlurred
        className="basis-96 h-96 block border-1 border-danger"
      >
        <CardBody className="z-0 h-full w-full p-0">
          <Map position={position} />
        </CardBody>
        <CardFooter className="absolute bottom-0 z-10 bg-black/50 justify-center">
          <p className="font-semibold">{job.address}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobPage;
