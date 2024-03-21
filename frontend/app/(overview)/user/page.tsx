"use client";

import ResumeCard from "@/app/components/ui/resume-card";
import { UserPageSkeleton } from "@/app/components/ui/skeletons";
import UserCard from "@/app/components/ui/user-card";
import { useAuthContext } from "@/app/context/auth-context";

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
      {isLoading && <UserPageSkeleton />}
    </div>
  );
};

export default UserPage;
