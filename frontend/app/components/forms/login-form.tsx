"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { LoginUserState, loginUser } from "@/app/lib/users/actions";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../context/auth-context";

const LoginForm = () => {
  const [loginInput, setLoginInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const { handleUserData } = useAuthContext();
  const router = useRouter();

  const initialState = { message: null, errors: {}, user: null };

  const [state, dispatch] = useFormState<LoginUserState, FormData>(
    loginUser,
    initialState
  );

  useEffect(() => {
    if (state.user) {
      // console.log("This is loginform user:" + state.user.email);
      handleUserData(state.user);
      router.push("/");
    }
  }, [state, handleUserData, router]);

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <Input
        size="lg"
        label="Email"
        type="email"
        name="email"
        placeholder="example@example.com"
        isInvalid={state.errors?.username ? true : false}
        value={loginInput}
        onValueChange={setLoginInput}
        errorMessage={
          state.errors?.username && (
            <>
              {state.errors.username.map((error) => (
                <p key={error} className="font-semibold">
                  {error}
                </p>
              ))}
            </>
          )
        }
        isRequired
      />
      <Input
        size="lg"
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        isInvalid={state.errors?.password ? true : false}
        value={passwordInput}
        onValueChange={setPasswordInput}
        errorMessage={
          state.errors?.password && (
            <>
              {state.errors.password.map((error) => (
                <p key={error} className="font-semibold">
                  {error}
                </p>
              ))}
            </>
          )
        }
        isRequired
      />
      <Button color="danger" type="submit" className="text-lg font-semibold">
        Login
      </Button>
      {state.message && (
        <p className="font-semibold text-danger text-tiny text-center">
          {state.message}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
