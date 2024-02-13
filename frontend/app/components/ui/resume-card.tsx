import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import ResumeForm from "../forms/resume-form";
import { ResumeType } from "@/app/lib/types";
import Link from "next/link";

const ResumeCard = ({ userResume }: { userResume: ResumeType }) => {
  return (
    <Card>
      <CardHeader>Manage Resume</CardHeader>
      <CardBody>
        {userResume.resume && (
          <div className="flex justify-between items-center mb-4">
            <p className="text-success">Your resume is uploaded!</p>
            <Button
              color="danger"
              variant="faded"
              as={Link}
              href={userResume.resume}
            >
              Download
            </Button>
          </div>
        )}
        <ResumeForm />
      </CardBody>
    </Card>
  );
};

export default ResumeCard;
