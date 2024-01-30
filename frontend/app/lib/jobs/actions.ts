import { z } from "zod";

const JobSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  email: z.string().email({ message: "Fill email field correct" }),
  street: z.coerce.string(),
  addressDetails1: z.coerce.string(),
  addressDetails2: z.coerce.string(),
  jobType: z.enum(["Permanent", "Temporary", "Intership"]),
  education: z.enum(["Bachelors", "Masters", "Phd"]),
  industry: z.enum([
    "business",
    "Information Technology",
    "Banking",
    "Education/Training",
    "Telecomunication",
    "Others",
  ]),
  experience: z.enum(["No experience", "1 year", "2 years", "3 years plus"]),
  salary: z
    .number()
    .min(1, { message: "Salary cannot be less than 1 and more than 1000000" })
    .max(1000000, {
      message: "Salary cannot be less than 1 and more than 1000000",
    }),
  positions: z.number(),
  company: z.string().max(100),
  lastDate: z.date(),
  createdAt: z.date(),
});

export type CreateJobState = {
  errors?: {
    title?: string[];
    description?: string[];
    email?: string[];
    street?: string[];
    addressDetails1?: string[];
    addressDetails2?: string[];
    jobType?: string[];
    education?: string[];
    industry?: string[];
    experience?: string[];
    salary?: string[];
    positions?: string[];
    company?: string[];
    lastDate?: string[];
    createdAt?: string[];
  };
  message?: string | null;
};

const CreateJob = JobSchema.omit({ id: true });

export async function createJob() {}
