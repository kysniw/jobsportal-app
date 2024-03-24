"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const JobSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  email: z.string().email({ message: "Fill email field correct" }),
  address: z.coerce.string(),
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
  salary: z.coerce
    .number()
    .min(1, { message: "Salary cannot be less than 1 and more than 1000000" })
    .max(1000000, {
      message: "Salary cannot be less than 1 and more than 1000000",
    }),
  positions: z.coerce
    .number()
    .min(1, { message: "One position is a minimum!" }),
  company: z.string().max(100),
  lastDate: z.coerce.date(),
  createdAt: z.date(),
});

export type CreateJobState = {
  errors?: {
    title?: string[];
    description?: string[];
    email?: string[];
    address?: string[];
    jobType?: string[];
    education?: string[];
    industry?: string[];
    experience?: string[];
    salary?: string[];
    positions?: string[];
    company?: string[];
    lastDate?: string[];
  };
  message?: string | null;
};

const CreateJob = JobSchema.omit({ id: true, createdAt: true });

export async function createJob(prevState: CreateJobState, formData: FormData) {
  const validatedFields = CreateJob.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    email: formData.get("email"),
    address: formData.get("address"),
    jobType: formData.get("jobType"),
    education: formData.get("education"),
    industry: formData.get("industry"),
    experience: formData.get("experience"),
    salary: formData.get("salary"),
    positions: formData.get("positions"),
    company: formData.get("company"),
    lastDate: formData.get("lastDate"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "One or more fields are invalid!",
    };
  }

  const token = cookies().get("Token")?.value;

  try {
    const response = await fetch(`${process.env.APP_KEY}/jobs/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: validatedFields.data.title,
        description: validatedFields.data.description,
        email: validatedFields.data.email,
        address: validatedFields.data.address,
        jobType: validatedFields.data.jobType,
        education: validatedFields.data.education,
        industry: validatedFields.data.industry,
        experience: validatedFields.data.experience,
        salary: validatedFields.data.salary,
        positions: validatedFields.data.positions,
        company: validatedFields.data.company,
        lng: 0,
        lat: 0,
        lastDate: validatedFields.data.lastDate,
      }),
    });

    if (response.status !== 201) {
      return { message: "Form data is failed!" };
    }
  } catch (error) {
    return {
      message: `Ups! Something went wrong with backend server! ${error}`,
    };
  }
  revalidatePath("/");
  redirect("/user");
}

export async function applyToJob(id: string) {
  if (!cookies().has("Token")) {
    return {
      error: "Please login first!",
    };
  }

  try {
    const token = cookies().get("Token")?.value;
    const res = await fetch(`${process.env.APP_KEY}/jobs/${id}/candidate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    const candidateStatus = await res.json();
    return candidateStatus;
  } catch (error) {
    // console.log("Backend error: ", error);
    return {
      error: "Ups! Something went wrong with backend server! Try again later.",
    };
  }
}
