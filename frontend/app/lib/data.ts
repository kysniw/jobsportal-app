"use server";

import { ReadonlyURLSearchParams } from "next/navigation";
import { JobChoicesProps, JobProps, JobsPromiseType } from "./types";
import { cookies } from "next/headers";

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

    const { count, pageSize, jobs } = (await res.json()) as JobsPromiseType;
    // console.log(jobs);
    return {
      jobsProps: {
        count,
        pageSize,
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

export async function getUserJobs() {
  try {
    if (!cookies().has("Token")) {
      return {
        message: "Please login first!",
      };
    }

    const token = cookies().get("Token")?.value;

    const res = await fetch(`${process.env.APP_KEY}/users/me/jobs`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const userJobs = await res.json();
    return userJobs;
  } catch (error) {
    console.log("Backend error: ", error);
    return {
      message:
        "Ups! Something went wrong with backend server! Try again later.",
    };
  }
}

export async function getUserApplications() {
  try {
    if (!cookies().has("Token")) {
      return {
        message: "Please login first!",
      };
    }

    const token = cookies().get("Token")?.value;

    const res = await fetch(`${process.env.APP_KEY}/users/me/applies`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const userApplies = await res.json();
    return userApplies;
  } catch (error) {
    console.log("Backend error: ", error);
    return {
      message:
        "Ups! Something went wrong with backend server! Try again later.",
    };
  }
}

export async function getJobsStats(topic: string) {
  try {
    const res = await fetch(`${process.env.APP_KEY}/jobs/stats/${topic}/`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    const jobsStats = await res.json();
    return jobsStats;
  } catch (error) {
    console.log("Backend error: ", error);
    return {
      message:
        "Ups! Something went wrong with backend server! Try again later.",
    };
  }
}
