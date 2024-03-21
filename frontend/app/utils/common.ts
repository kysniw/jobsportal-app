import { formatDistanceToNow } from "date-fns";
import { JobProps, JobChoicesProps } from "../lib/types";

export const dataDistanceToNow = (stringDate: string, suffix: boolean) => {
  const distanceStringFormat = formatDistanceToNow(new Date(stringDate), {
    addSuffix: suffix,
  });

  return distanceStringFormat;
};

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

export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Stats",
    href: "/job/stats",
  },
  {
    label: "About",
    href: "/about",
  },
];
