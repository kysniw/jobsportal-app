import RegisterForm from "@/app/components/forms/register-form";
import {
  Card,
  CardBody,
  Divider,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const RegiserPage = () => {
  return (
    <div className="w-full">
      <Card className="mx-auto mt-20 max-w-[400px]">
        <CardHeader className="relative">
          <h1 className="text-3xl font-semibold mx-auto">Sign Up</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <RegisterForm />
        </CardBody>
        <CardFooter>
          <p>
            Do you have an account?{" "}
            <Link href="/auth/login" className="text-danger underline">
              Login there
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegiserPage;
