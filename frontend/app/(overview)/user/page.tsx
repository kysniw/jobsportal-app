"use client";

import ResumeCard from "@/app/components/ui/resume-card";
import UserCard from "@/app/components/ui/user-card";
import { useAuthContext } from "@/app/context/auth-context";

import React from "react";

const UserPage = () => {
  const { user } = useAuthContext();
  if (user) {
    return (
      <div className="flex justify-center">
        <UserCard user={user} />
        <ResumeCard userResume={user.userresume} />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        <p>There is a problem with user content</p>
      </div>
    );
  }
};

export default UserPage;
