import { ReadonlyURLSearchParams } from "next/navigation";
import Filters from "../components/filters";
import JobsList from "../components/ui/jobs-list";

export default function Home({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  return (
    <div className="container px-2 flex flex-row justify-center gap-4 mx-auto">
      <div className="hidden lg:block sticky top-20 self-start">
        <Filters />
      </div>
      <JobsList searchParams={searchParams} />
    </div>
  );
}
