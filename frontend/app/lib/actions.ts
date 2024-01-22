"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { UserResponse, UserType } from "./types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const UserSchema = z.object({
  id: z.number(),
  username: z.coerce
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Email cannot be so short" }),
  password: z.coerce
    .string()
    .min(6, { message: "Password must have from 6 to 20 signs" })
    .max(20, { message: "Password must have from 6 to 20 signs" }),
  firstname: z.string(),
  lastname: z.string(),
});

export type LoginState = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
  user?: UserType | null;
};

export type RegisterState = {
  errors?: {
    username?: string[];
    firstname?: string[];
    lastname?: string[];
    password?: string[];
    confirmPassword?: string;
  };
  message?: string | null;
};

const LoginUser = UserSchema.omit({
  id: true,
  firstname: true,
  lastname: true,
});

export async function loginUser(prevState: LoginState, formData: FormData) {
  const validatedFields = LoginUser.safeParse({
    username: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields!",
    };
  }

  try {
    const res = await fetch(`${process.env.APP_KEY}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });
    if (res.status !== 200) {
      console.log(res);
      return {
        message: "Invalid email or password!",
      };
    }

    const response = await res.json();

    if (response.access && response.refresh) {
      console.log(response);
      cookies().set({
        name: "Token",
        value: response.access,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development",
        path: "/",
        maxAge: 60 * 60 * 24 * 15,
      });

      const userRes = (await getUser()) as UserResponse;

      if (userRes.user) {
        return {
          user: userRes.user,
        };
      } else {
        return {
          message: userRes.message,
        };
      }
    } else {
      return {
        message: "Something went wrong!",
      };
    }
  } catch (error) {
    // console.log("Backend error: ", error);
    return {
      message: `Ups! Something went wrong with backend server! ${error}`,
    };
  }
}

const RegisterUser = UserSchema.omit({ id: true });

export async function createUser(prevState: RegisterState, formData: FormData) {
  const validatedFields = RegisterUser.safeParse({
    username: formData.get("email"),
    firstname: formData.get("first_name"),
    lastname: formData.get("last_name"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "One or more fields are invalid!",
    };
  }

  const confirmPassword = formData.get("confirm_password");
  if (validatedFields.data.password !== confirmPassword) {
    return {
      errors: { confirmPassword: "Passwords are not the same!" },
      message: "One or more fields are invalid!",
    };
  }

  try {
    const res = await fetch(`${process.env.APP_KEY}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: validatedFields.data.firstname,
        last_name: validatedFields.data.lastname,
        email: validatedFields.data.username,
        password: validatedFields.data.password,
      }),
    });

    if (res.status !== 201) {
      console.log(res);
      return {
        message: "Invalid form data!",
      };
    }
  } catch (error) {
    // console.log("Backend error: ", error);
    return {
      message: `Ups! Something went wrong with backend server! ${error}`,
    };
  }

  revalidatePath("/auth/login");
  redirect("/auth/login");
}

export async function getUser() {
  const cookieStore = cookies();
  const isLogged = cookieStore.has("Token");
  console.log(isLogged);
  console.log(cookieStore.get("Token"));

  if (isLogged) {
    const token = cookieStore.get("Token")?.value;

    const res = await fetch(`${process.env.APP_KEY}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status !== 200) {
      cookieStore.delete("Token");
      if (res.status === 401) {
        return {
          message: "Please login again.",
        };
      } else {
        return {
          message: "There is problem with authentication",
          status: res.status,
        };
      }
    }

    const resData = await res.json();

    return { user: resData };
  }

  return {
    message: "Login first!",
  };
}

export async function logoutUser() {
  const cookieStore = cookies();
  if (!cookieStore.has("Token")) {
    return {
      error: "There is no authenticated user. Cannot logout.",
      success: false,
    };
  }
  cookieStore.delete("Token");

  return {
    message: "Logged out!",
    success: true,
  };
}
