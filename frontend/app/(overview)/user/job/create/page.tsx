import CreateJobForm from "@/app/components/forms/create-job-form";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import React from "react";

const CreateJobPage = () => {
  return (
    <div>
      <Card className="mx-auto my-10 w-11/12 max-w-3xl">
        <CardHeader>
          <h1 className="my-2 text-3xl font-semibold mx-auto text-danger">
            Create Job Offer
          </h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <CreateJobForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateJobPage;
