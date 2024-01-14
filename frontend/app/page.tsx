import { getAllJobs } from "./lib/data";
import JobsList from "./components/ui/jobslist";

export default function Home() {
  // getAllJobs();

  // console.log(process.env.API_KEY);
  return (
    <div className="min-h-screen pt-20 container px-2 lg:px-20 mx-auto">
      <JobsList />
    </div>
  );
}
