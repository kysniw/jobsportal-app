"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { UpdateUserState, updateUser } from "../../lib/users/actions";
import { useAuthContext } from "../../context/auth-context";
import { useRouter } from "next/navigation";

const UpdateForm = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const { user, handleUserData } = useAuthContext();

  const router = useRouter();

  const initialState = { errors: {}, message: null, user: null };

  const [state, dispatch] = useFormState<UpdateUserState, FormData>(
    updateUser,
    initialState
  );

  useEffect(() => {
    if (user) {
      setFirstNameInput(user.first_name);
      setLastNameInput(user.last_name);
      setEmailInput(user.email);
    }

    if (state.user) {
      console.log("This is loginform user:" + state.user.email);
      handleUserData(state.user);
      router.push("/user");
    }
  }, [user, state, handleUserData, router]);

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
      <Button color="danger" type="submit" className="text-lg font-semibold">
        Update
      </Button>
      {state.message && (
        <p className="font-semibold text-danger text-tiny text-center">
          {state.message}
        </p>
      )}
    </form>
  );
};

export default UpdateForm;
