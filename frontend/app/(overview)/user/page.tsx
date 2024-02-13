"use client";

import ResumeCard from "@/app/components/ui/resume-card";
import UserCard from "@/app/components/ui/user-card";
import { useAuthContext } from "@/app/context/auth-context";
import { Card, Skeleton } from "@nextui-org/react";

import React from "react";

const UserPage = () => {
  const { user, isLoading } = useAuthContext();

  return (
    <div className="flex justify-center items-start flex-wrap">
      {user && (
        <>
          <UserCard user={user} />
          <ResumeCard userResume={user.userresume} />
        </>
      )}
      {isLoading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default UserPage;
