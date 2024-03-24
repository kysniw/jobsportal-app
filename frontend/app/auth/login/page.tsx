import LoginForm from "@/app/components/forms/login-form";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Button,
  CardFooter,
} from "@nextui-org/react";
import { FaHome } from "react-icons/fa";
import React from "react";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen h-full flex justify-center items-center">
      <Card className="mx-4 max-w-[400px] w-full">
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
          <h1 className="text-3xl font-semibold mx-auto">Sign In</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <LoginForm />
        </CardBody>
        <CardFooter>
          <p>
            Not registered yet?{" "}
            <Link href="/auth/register" className="text-danger underline">
              Register there
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
