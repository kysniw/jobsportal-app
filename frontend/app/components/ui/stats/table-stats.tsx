"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Progress,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { getJobsStats } from "../../../lib/data";
import ProgressStats from "./progress-stats";
import { JobsStatsProps } from "@/app/lib/types";

const TableStats = ({ topic }: { topic: string | null }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<JobsStatsProps>({
    jobsCount: 0,
    positionsAvg: 0,
    salaryAvg: 0,
    salaryMax: 0,
    salaryMin: 0,
  });

  useEffect(() => {
    const getStats = async (topic: string) => {
      const statsRes = await getJobsStats(topic);

      if (statsRes.message) {
        setMessage(statsRes.message.toString());
        setStats({
          jobsCount: 0,
          positionsAvg: 0,
          salaryAvg: 0,
          salaryMax: 0,
          salaryMin: 0,
        });
      } else {
        setMessage(null);
        setStats({
          jobsCount: statsRes.jobs_count,
          positionsAvg: statsRes.positions_avg,
          salaryAvg: statsRes.salary_avg,
          salaryMax: statsRes.salary_max,
          salaryMin: statsRes.salary_min,
        });
      }
    };

    if (topic) getStats(topic);
  }, [topic]);

  return (
    <>
      {message && (
        <p className="text-danger text-center font-semibold pb-2">{message}</p>
      )}
      <Table hideHeader aria-label="Stats table">
        <TableHeader>
          <TableColumn aria-label="variables">VAR</TableColumn>
          <TableColumn aria-label="values">VAL</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Offers count</TableCell>
            <TableCell>{stats.jobsCount}</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Positions avg.</TableCell>
            <TableCell>{stats.positionsAvg}</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Salary max.</TableCell>
            <TableCell>${stats.salaryMax}</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>Salary min.</TableCell>
            <TableCell>${stats.salaryMin}</TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>Salary avg.</TableCell>
            <TableCell>${stats.salaryAvg}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {stats.jobsCount !== 0 && <ProgressStats stats={stats} />}
    </>
  );
};

export default TableStats;
