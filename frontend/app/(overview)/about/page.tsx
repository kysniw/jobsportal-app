import { Button, Divider, User } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaLinkedinIn } from "react-icons/fa6";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-full items-center justify-center max-w-[40rem] w-full mx-auto">
      <h1 className="text-lg font-medium">
        Welcome on my portfolio project named
      </h1>
      <h1 className="font-medium text-xl my-4">
        Jobs<span className="text-rose-500 font-extrabold">Portal</span>
      </h1>
      <p className="font-semibold text-foreground-400 my-4">
        This is demo of the portal created for looking for the job inspired with
        NoFluffJobs or JustJoinIT. However it&apos;s fully functional and you
        can register, login, apply, create job offer etc.
      </p>
      <Divider />
      <div className="mt-4 w-full flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between items-center">
        <User
          name="Jakub Winsyk"
          description="Fullstack developer"
          avatarProps={{
            className: "w-20 h-20 sm:w-24 sm:h-24",
            src: "./about_sm.png",
          }}
          classNames={{
            name: "text-xl font-semibold",
            description: "text-lg",
          }}
        />
        <div className="flex gap-2">
          <Button
            as={Link}
            href="https://github.com/kysniw"
            target="_blank"
            size="lg"
            isIconOnly
            variant="ghost"
          >
            <FaGithub className="h-2/3 w-2/3" />
          </Button>
          <Button
            as={Link}
            href="https://www.linkedin.com/in/jakub-winsyk/"
            target="_blank"
            size="lg"
            isIconOnly
            variant="ghost"
          >
            <FaLinkedinIn className="h-2/3 w-2/3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
