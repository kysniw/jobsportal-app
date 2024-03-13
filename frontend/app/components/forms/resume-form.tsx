"use client";

import { ResumeUploadState, uploadResume } from "@/app/lib/users/actions";
import { Button } from "@nextui-org/react";
import React from "react";
import { useFormState } from "react-dom";

const ResumeForm = () => {
  const initialState = { errors: {} };

  const [state, dispatch] = useFormState<ResumeUploadState, FormData>(
    uploadResume,
    initialState
  );
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <input
        type="file"
        name="resume"
        accept="application/pdf"
        className="block w-full rounded-lg file:h-full file:rounded-lg
        file:outline-none file:border-none file:mr-4 file:p-2 file:cursor-pointer"
      />
      <Button type="submit" variant="faded" className="text-md font-bold">
        Upload
      </Button>
      {state.errors?.resume && (
        <p className="text-danger">{state.errors.resume}</p>
      )}
    </form>
  );
};

export default ResumeForm;
