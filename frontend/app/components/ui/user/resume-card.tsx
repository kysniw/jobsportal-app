"use client";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React, { useState } from "react";
import ResumeForm from "../../forms/resume-form";
import { ResumeType } from "@/app/lib/types";
import { FaDownload, FaX } from "react-icons/fa6";
import Link from "next/link";

const ResumeCard = ({ userResume }: { userResume: ResumeType }) => {
  return (
    <CardBody>
      <p className="m-2 text-foreground-400">Manage your resume</p>
      <Card className="bg-foreground-100">
        <CardBody>
          <ResumeForm />
        </CardBody>
        <CardBody>
          {userResume.resume ? (
            <div className="flex items-center">
              <p className="text-center flex-1 text-danger font-semibold">
                Your resume is ready to download!
              </p>
              <Button
                as={Link}
                href={userResume.resume}
                target="_blank"
                isIconOnly
                size="lg"
                variant="ghost"
                color="danger"
              >
                <FaDownload />
              </Button>
            </div>
          ) : (
            <p className="text-center text-danger font-semibold">
              You have no resume uploaded yet
            </p>
          )}
        </CardBody>
      </Card>
    </CardBody>
  );
};

export default ResumeCard;
