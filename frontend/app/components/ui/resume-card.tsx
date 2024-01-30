import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import ResumeForm from "../forms/resume-form";
import { ResumeType } from "@/app/lib/types";

const ResumeCard = ({ userResume }: { userResume: ResumeType }) => {
  return (
    <Card>
      <CardHeader>Manage Resume</CardHeader>
      <CardBody>
        {userResume.resume && (
          <div>
            <p className="text-success">Your resume is uploaded!</p>
          </div>
        )}
        <ResumeForm />
      </CardBody>
    </Card>
  );
};

export default ResumeCard;
