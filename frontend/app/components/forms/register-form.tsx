"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { RegisterUserState, createUser } from "../../lib/users/actions";

const RegisterForm = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const initialState = { errors: {}, message: null };

  const [state, dispatch] = useFormState<RegisterUserState, FormData>(
    createUser,
    initialState
  );

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <Input
        size="lg"
        label="First Name"
        type="text"
        name="first_name"
        placeholder="John"
        isInvalid={state.errors?.firstname ? true : false}
        value={firstNameInput}
        onValueChange={setFirstNameInput}
        errorMessage={
          state.errors?.firstname && (
            <>
              {state.errors.firstname.map((error) => (
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
        label="Last Name"
        type="text"
        name="last_name"
        placeholder="Smith"
        isInvalid={state.errors?.lastname ? true : false}
        value={lastNameInput}
        onValueChange={setLastNameInput}
        errorMessage={
          state.errors?.lastname && (
            <>
              {state.errors.lastname.map((error) => (
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
        label="Email"
        type="email"
        name="email"
        placeholder="example@example.com"
        isInvalid={state.errors?.username ? true : false}
        value={emailInput}
        onValueChange={setEmailInput}
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
      <Input
        size="lg"
        label="Password"
        name="confirm_password"
        type="password"
        placeholder="Confirm your password"
        isInvalid={state.errors?.confirmPassword ? true : false}
        value={confirmPasswordInput}
        onValueChange={setConfirmPasswordInput}
        errorMessage={
          state.errors?.confirmPassword && (
            <>
              <p className="font-semibold">{state.errors.confirmPassword}</p>
            </>
          )
        }
        isRequired
      />
      <Button color="danger" type="submit" className="text-lg font-semibold">
        Register
      </Button>
      {state.message && (
        <p className="font-semibold text-danger text-tiny text-center">
          {state.message}
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
