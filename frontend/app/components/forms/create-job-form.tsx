"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { CreateJobState, createJob } from "@/app/lib/jobs/actions";

const RegisterForm = () => {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [streetInput, setStreetInput] = useState("");
  const [ad1Input, setAd1Input] = useState("");
  const [ad2Input, setAd2Input] = useState("");

  const initialState = { errors: {}, message: null };

  const [state, dispatch] = useFormState<CreateJobState, FormData>(
    createJob,
    initialState
  );

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <Input
        size="lg"
        label="Title"
        type="text"
        name="title"
        placeholder="Junior Next.js Developer"
        isInvalid={state.errors?.title ? true : false}
        value={titleInput}
        onValueChange={setTitleInput}
        errorMessage={
          state.errors?.title && (
            <>
              {state.errors.title.map((error) => (
                <p key={error} className="font-semibold">
                  {error}
                </p>
              ))}
            </>
          )
        }
        isRequired
      />
      <Textarea
        size="lg"
        label="Description"
        name="description"
        minRows={4}
        maxRows={50}
        placeholder="Enter job's offer description"
        isInvalid={state.errors?.description ? true : false}
        value={descInput}
        onValueChange={setDescInput}
        errorMessage={
          state.errors?.description && (
            <>
              {state.errors.description.map((error) => (
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
        isInvalid={state.errors?.email ? true : false}
        value={emailInput}
        onValueChange={setEmailInput}
        errorMessage={
          state.errors?.email && (
            <>
              {state.errors.email.map((error) => (
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
        label="Street"
        name="street"
        type="text"
        placeholder="Write company's street"
        isInvalid={state.errors?.street ? true : false}
        value={streetInput}
        onValueChange={setStreetInput}
        errorMessage={
          state.errors?.street && (
            <>
              {state.errors.street.map((error) => (
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
        label="Address details 1"
        name="addressDetails1"
        type="text"
        placeholder="Add details of company's address"
        isInvalid={state.errors?.addressDetails1 ? true : false}
        value={ad1Input}
        onValueChange={setAd1Input}
        errorMessage={
          state.errors?.addressDetails1 && (
            <>
              <p className="font-semibold">{state.errors.addressDetails1}</p>
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
