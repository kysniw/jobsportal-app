import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  cn,
} from "@nextui-org/react";
import React from "react";

const JobCard = ({ job }: any) => {
  return (
    <Link
      href={`/job/${job.id}`}
      className="block scale-100 hover:scale-105 transition-transform
      max-w-[40rem] mx-auto my-3"
    >
      <Card>
        <CardHeader className="block">
          <p className="text-2xl font-bold">{job.title}</p>
          <p className="text-danger font-medium">{job.company}</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>{job.description}</p>
        </CardBody>
        <Divider />
        <CardFooter className="text-danger">{job.salary}</CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
