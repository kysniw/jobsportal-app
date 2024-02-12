import { ReadonlyURLSearchParams } from "next/navigation";
import Filters from "../components/filters";
import JobsList from "../components/ui/jobs-list";

export default function Home({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  return (
    <div className="container px-2 flex flex-col lg:flex-row lg:justify-center gap-4 mx-auto">
      <Filters />
      <JobsList searchParams={searchParams} />
    </div>
  );
}
