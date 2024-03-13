"use client";

import { JobType } from "@/app/lib/types";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import React from "react";

const JobTable = ({ job }: { job: JobType }) => {
  return (
    <Table
      hideHeader
      isStriped
      shadow="none"
      aria-label="Table with details of job's offer"
    >
      <TableHeader>
        <TableColumn>RULE</TableColumn>
        <TableColumn>VALUE</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Education</TableCell>
          <TableCell>{job.education}</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Industry</TableCell>
          <TableCell>{job.industry}</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Experience</TableCell>
          <TableCell>{job.experience}</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>Salary</TableCell>
          <TableCell>
            <p>${job.salary}</p>
          </TableCell>
        </TableRow>
        <TableRow key="5">
          <TableCell>Contract</TableCell>
          <TableCell>{job.jobType}</TableCell>
        </TableRow>
        <TableRow key="6">
          <TableCell>Address</TableCell>
          <TableCell>{job.address}</TableCell>
        </TableRow>
        <TableRow key="7">
          <TableCell>Email</TableCell>
          <TableCell>{job.email}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default JobTable;
