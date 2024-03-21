import { ReadonlyURLSearchParams } from "next/navigation";
import Filters from "../components/filters";
import JobsList from "../components/ui/jobs-list";
import { Suspense } from "react";
import { JobCardSkeleton } from "../components/ui/skeletons";
import { Button } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa6";
import FiltersModal from "../components/filters-modal";

export default function Home({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  return (
    <div className="min-h-full container flex justify-center gap-4 mx-auto">
      <div className="sticky top-24 self-start">
        <div className="hidden lg:block">
          <Filters />
        </div>
        <div className="block lg:hidden">
          <FiltersModal />
        </div>
      </div>
      <Suspense fallback={<JobCardSkeleton />}>
        <JobsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
