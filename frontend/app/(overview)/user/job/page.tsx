import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const OwnOffersPage = () => {
  return (
    <div className="w-full">
      <Button size="lg" color="danger" as={Link} href="/user/job/create">
        Create offer
      </Button>
    </div>
  );
};

export default OwnOffersPage;
