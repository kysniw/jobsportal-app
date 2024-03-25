"use client";

import { useAuthContext } from "@/app/context/auth-context";
import { ResumeUploadState, uploadResume } from "@/app/lib/users/actions";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { FaX } from "react-icons/fa6";

const ResumeForm = () => {
  const [file, setFile] = useState<string | null>(null);
  const [state, setState] = useState<ResumeUploadState>();

  const { user, handleUserData } = useAuthContext();

  const handleFormAction = async (formData: FormData) => {
    setFile(null);

    const actionResponse = await uploadResume(formData);
    setState(actionResponse);
    if (!!actionResponse.resume && !!user)
      handleUserData({ ...user, userresume: actionResponse.resume });
  };

  return (
    <form action={handleFormAction} className="flex flex-col gap-4">
      <label
        htmlFor="resume"
        className="border-2 border-dashed rounded-xl border-foreground-400
        p-4 hover:bg-foreground-300 hover:cursor-pointer duration-200 text-center"
      >
        {file && (
          <div className="flex justify-center items-center">
            <p className="mr-4">{file}</p>
            <Button
              size="sm"
              variant="flat"
              onPress={() => setFile(null)}
              isIconOnly
            >
              <FaX />
            </Button>
          </div>
        )}
        {!file && <p className="text-foreground-500">Drag or choose file</p>}
        <input
          id="resume"
          name="resume"
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files && e.target.files.length !== 0)
              setFile(e.target.files[0].name);
            else setFile(null);
          }}
          className="hidden"
        />
      </label>
      <Button type="submit" size="lg" variant="ghost" isDisabled={!file}>
        Upload
      </Button>
      {state && state.error && (
        <p className="text-warning font-semibold text-center">{state.error}</p>
      )}
      {state && state.message && (
        <p className="text-success font-semibold text-center">
          {state.message}
        </p>
      )}
    </form>
  );
};

export default ResumeForm;
