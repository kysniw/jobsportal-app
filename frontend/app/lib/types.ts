export type JobProps = {
  id?: number;
  title: string;
  description: string;
  email: string;
  address: string;
  jobType: string;
  education: string;
  industry: string;
  experience: string;
  salary: number;
  positions: number;
  company: string;
  lat?: number;
  lng?: number;
  lastDate: string;
  createdAt?: string;
};

export type JobsPromiseType = {
  count: number;
  pageSize: number;
  jobs: JobProps[];
};

export type JobChoicesProps = {
  name: "jobType" | "education" | "industry" | "experience";
  label: string;
  placeholder: string;
  elements: string[];
};

export type PositionType = number[];

export type ResumeType = {
  id: number;
  resume: string;
};

export type UserType = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  userresume: ResumeType;
};

export type UserResponse = {
  user?: UserType;
  message?: string;
};

export type AuthContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
  handleUserData: (user: UserType) => void;
  handleLogout: () => void;
};

export type LoginFormType = {
  username: string;
  password: string;
};

export type LoginResponseType = {
  refresh: string;
  access: string;
  detail?: string;
};

export type JobsStatsProps = {
  jobsCount: number;
  positionsAvg: number;
  salaryAvg: number;
  salaryMax: number;
  salaryMin: number;
};
