import JobsList from "../components/ui/jobs-list";
import { Card } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="container px-2 flex flex-col lg:flex-row lg:justify-center gap-4 mx-auto">
      <Card className="sticky top-20 w-80 h-96 bg-danger-50">
        There will be filters
      </Card>
      <JobsList />
    </div>
  );
}
