import SearchStats from "@/app/components/ui/stats/search-stats";
import TableStats from "@/app/components/ui/stats/table-stats";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";

const StatsPage = async ({
  searchParams,
}: {
  searchParams: { topic?: string };
}) => {
  const topic = searchParams?.topic || null;

  console.log(topic);

  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="max-w-[40rem] w-full">
        <SearchStats />
        <TableStats topic={topic} />
        {/*  */}
      </div>
    </div>
  );
};

export default StatsPage;
