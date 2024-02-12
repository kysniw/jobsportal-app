import { ReadonlyURLSearchParams } from "next/navigation";
import { JobsPromiseType } from "./types";

export async function getAllJobs(searchParams: ReadonlyURLSearchParams) {
  const url = searchParams
    ? `${process.env.APP_KEY}/jobs/?${new URLSearchParams(
        searchParams
      ).toString()}`
    : `${process.env.APP_KEY}/jobs`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });

    const { count, page_size, jobs } = (await res.json()) as JobsPromiseType;
    // console.log(jobs);
    return {
      jobsProps: {
        count,
        page_size,
        jobs,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message:
        "Ups! Something went wrong with backend server! Try again later.",
    };
  }
}

export async function getJobById(id: string) {
  try {
    const res = await fetch(`${process.env.APP_KEY}/jobs/${id}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });

    const job = await res.json();
    return job;
  } catch (error) {
    console.log("Backend error: ", error);
    return {
      message:
        "Ups! Something went wrong with backend server! Try again later.",
    };
  }
}
