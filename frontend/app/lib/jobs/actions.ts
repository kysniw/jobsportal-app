import { revalidatePath } from "next/cache";
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
  salary: z
    .number()
    .min(1, { message: "Salary cannot be less than 1 and more than 1000000" })
    .max(1000000, {
      message: "Salary cannot be less than 1 and more than 1000000",
    }),
  positions: z.number().min(1, { message: "One position is a minimum!" }),
  company: z.string().max(100),
  lastDate: z.date(),
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

  try {
    const response = await fetch(`${process.env.API_KEY}/jobs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields),
    });

    if (response.status !== 201) {
      console.log(response.statusText);
      return { message: "Form data is failed!" };
    }
  } catch (error) {
    // console.log("Backend error: ", error);
    return {
      message: `Ups! Something went wrong with backend server! ${error}`,
    };
  }
  revalidatePath("/");
  redirect("/user");
}
