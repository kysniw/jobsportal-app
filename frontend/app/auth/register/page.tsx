import RegisterForm from "@/app/components/forms/register-form";
import {
  Card,
  CardBody,
  Divider,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";

const RegiserPage = () => {
  return (
    <div className="w-full">
      <Card className="mx-auto mt-20 max-w-[400px]">
        <CardHeader className="relative">
          <Button
            radius="none"
            color="danger"
            variant="light"
            as={Link}
            href="/"
            isIconOnly
            className="absolute flex justify-center w-14 left-0 top-0 h-full"
          >
            <FaHome className="h-10 w-10" />
          </Button>
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
