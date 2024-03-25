import { JobsStatsProps } from "@/app/lib/types";
import { Progress } from "@nextui-org/react";
import React from "react";

const ProgressStats = ({ stats }: { stats: JobsStatsProps }) => {
  return (
    <div className="mt-4 px-2">
      <p className="text-foreground-400 text-center">
        This is salary visualisation
      </p>
      <Progress
        minValue={stats.salaryMin}
        value={stats.salaryAvg}
        maxValue={stats.salaryMax}
        label={`$${stats.salaryMin}`}
        showValueLabel
        valueLabel={`$${stats.salaryMax}`}
        color="danger"
        aria-label="position salary stats"
      />
      <p className="text-center text-danger font-bold pt-2">
        ${stats.salaryAvg}
      </p>
    </div>
  );
};

export default ProgressStats;
