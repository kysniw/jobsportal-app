export type JobType = {
  id: number;
  title: string;
  description: string;
  email: string;
  address: string;
  job_type: string;
  education: string;
  industry: string;
  experience: string;
  salary: number;
  positions: number;
  company: string;
  point: string;
  last_date: string;
  created_at: string;
};

export type JobsPromiseType = {
  count: number;
  page_size: number;
  jobs: JobType[];
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
