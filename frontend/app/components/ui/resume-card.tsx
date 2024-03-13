import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";
import ResumeForm from "../forms/resume-form";
import { ResumeType } from "@/app/lib/types";
import Link from "next/link";

const ResumeCard = ({ userResume }: { userResume: ResumeType }) => {
  return (
    <Card>
      <CardHeader>
        <h1 className="mx-auto font-bold text-xl">Manage Resume</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <ResumeForm />
        {userResume.resume && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-success">Your resume is uploaded!</p>
            <Button
              color="danger"
              variant="faded"
              className="text-md font-bold"
              as={Link}
              href={userResume.resume}
            >
              Download
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ResumeCard;
