import { ReadonlyURLSearchParams } from "next/navigation";
import { JobChoicesProps, JobProps, JobsPromiseType } from "./types";

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

export const emptyJobCreateForm: JobProps = {
  title: "",
  description: "",
  email: "",
  company: "",
  address: "",
  jobType: "",
  education: "",
  industry: "",
  experience: "",
  salary: 0,
  positions: 0,
  lastDate: "",
};

export const jobChoices: JobChoicesProps[] = [
  {
    name: "jobType",
    label: "Job type",
    placeholder: "Choose job's contract type",
    elements: ["Permanent", "Temporary", "Intership"],
  },
  {
    name: "education",
    label: "Education",
    placeholder: "Choose required education level",
    elements: ["Bachelors", "Masters", "Phd"],
  },
  {
    name: "industry",
    label: "Industry",
    placeholder: "Choose job's discipline",
    elements: [
      "Business",
      "Information Technology",
      "Banking",
      "Education/Training",
      "Telecomunication",
      "Others",
    ],
  },
  {
    name: "experience",
    label: "Experience",
    placeholder: "Choose required experience",
    elements: ["No experience", "1 year", "2 years", "3 years plus"],
  },
];
