import UpdateForm from "@/app/components/forms/update-form";
import {
  Card,
  CardHeader,
  Button,
  Divider,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

import React from "react";

const EditUserPage = () => {
  return (
    <div className="w-full">
      <Card className="mx-auto mt-20 max-w-[400px]">
        <CardHeader>
          <h1 className="text-3xl font-semibold mx-auto">Edit profile</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <UpdateForm />
        </CardBody>
      </Card>
    </div>
  );
};

export default EditUserPage;
