import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from "@nextui-org/react";
import React from "react";

export const JobCardSkeleton = () => {
  return (
    <div className="h-full flex flex-col items-center">
      <Card className="w-[40rem] bg-default-100 mb-4">
        <CardHeader className="flex flex-col items-start gap-2">
          <Skeleton className="rounded-lg w-3/5">
            <div className="h-6 w-full"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-4/5">
            <div className="h-4 w-full"></div>
          </Skeleton>
        </CardHeader>
        <CardBody>
          <Skeleton className="rounded-lg">
            <div className="h-24"></div>
          </Skeleton>
        </CardBody>
        <CardFooter className="flex gap-2">
          <Skeleton className="rounded-lg w-1/5">
            <div className="h-6 w-full"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-1/5">
            <div className="h-6 w-full"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-1/5">
            <div className="h-6 w-full"></div>
          </Skeleton>
        </CardFooter>
      </Card>
      <Card className="max-w-[40rem] w-full bg-default-100">
        <CardHeader className="flex flex-col items-start gap-2">
          <Skeleton className="rounded-lg w-3/5">
            <div className="h-6 w-full"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-4/5">
            <div className="h-4 w-full"></div>
          </Skeleton>
        </CardHeader>
        <CardBody>
          <Skeleton className="rounded-lg">
            <div className="h-24"></div>
          </Skeleton>
        </CardBody>
        <CardFooter className="flex gap-2">
          <Skeleton className="rounded-lg w-1/5">
            <div className="h-6 w-full"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-1/5">
            <div className="h-6 w-full"></div>
          </Skeleton>
          <Skeleton className="rounded-lg w-1/5">
            <div className="h-6 w-full"></div>
          </Skeleton>
        </CardFooter>
      </Card>
    </div>
  );
};

export const UserPageSkeleton = () => {
  return (
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
