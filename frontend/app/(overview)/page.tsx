import { ReadonlyURLSearchParams } from "next/navigation";
import Filters from "../components/filters";
import JobsList from "../components/ui/jobs-list";
import { Suspense } from "react";
import { JobCardSkeleton } from "../components/ui/skeletons";
import FiltersModal from "../components/filters-modal";
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

export default function Home({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  return (
    <div className="min-h-full container flex flex-col lg:flex-row justify-center gap-4 mx-auto">
      <div className="sticky top-24 self-start z-10 max-w-[40rem] mx-auto w-full lg:w-auto">
        <div className="flex lg:hidden backdrop-blur-sm p-1 rounded-xl gap-10">
          <FiltersModal />
          <Input
            labelPlacement="outside"
            placeholder="Search"
            size="lg"
            startContent={<FaSearch />}
          />
        </div>
        <div className="hidden lg:block">
          <Filters />
        </div>
      </div>
      <Suspense fallback={<JobCardSkeleton />}>
        <JobsList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
