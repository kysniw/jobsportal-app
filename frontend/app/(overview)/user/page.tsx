"use client";

import ResumeCard from "@/app/components/ui/user/resume-card";
import { UserPageSkeleton } from "@/app/components/ui/skeletons";
import UserCard from "@/app/components/ui/user/user-card";
import { useAuthContext } from "@/app/context/auth-context";
import { Button, Card, CardBody, User } from "@nextui-org/react";

import React from "react";
import { FaPen } from "react-icons/fa6";

const UserPage = () => {
  const { user, isLoading } = useAuthContext();

  return (
    <div className="flex flex-col items-center">
      {user && (
        <>
          <h1 className="text-2xl font-semibold mb-1">Profile</h1>
          <Card className="max-w-[30rem] w-full">
            <CardBody>
              <p className="m-2 text-foreground-400">
                Manage your profile data
              </p>
              <Card className="bg-foreground-100">
                <CardBody className="flex flex-row justify-between">
                  <User
                    name={`${user.first_name} ${user.last_name}`}
                    description={user.username}
                    avatarProps={{
                      size: "lg",
                    }}
                    classNames={{
                      name: "text-lg",
                      description: "text-sm",
                    }}
                  />
                  <Button isIconOnly size="lg" variant="ghost" color="danger">
                    <FaPen />
                  </Button>
                </CardBody>
              </Card>
            </CardBody>
            <ResumeCard userResume={user.userresume} />
          </Card>
        </>
      )}
      {isLoading && <UserPageSkeleton />}
    </div>
  );
};

export default UserPage;
