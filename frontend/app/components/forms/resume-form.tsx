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
    <form action={dispatch} className="flex">
      <input
        type="file"
        name="resume"
        accept="application/pdf"
        className="block w-full rounded-lg bg-danger-100 file:h-full"
      />
      <Button type="submit" variant="faded">
        Upload
      </Button>
      {state.errors?.resume && (
        <p className="text-danger">{state.errors.resume}</p>
      )}
    </form>
  );
};

export default ResumeForm;
