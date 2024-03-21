"use client";

import { Pagination } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

const JobsPagination = ({ totalNumber }: { totalNumber: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const handlePaginationChange = (page: number) => {
    params.set("page", page.toString(10));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      className="w-fit my-4"
      showControls
      color="danger"
      total={totalNumber}
      initialPage={1}
      page={parseInt(searchParams.get("page")!, 10) || 1}
      onChange={handlePaginationChange}
    />
  );
};

export default JobsPagination;
