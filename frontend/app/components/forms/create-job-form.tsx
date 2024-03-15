"use client";

import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { CreateJobState, createJob } from "@/app/lib/jobs/actions";
import { JobProps } from "@/app/lib/types";
import { emptyJobCreateForm, jobChoices } from "@/app/lib/data";

const CreateJobForm = () => {
  const [formData, setFormData] = useState<JobProps>(emptyJobCreateForm);

  const initialState = { errors: {}, message: null };

  const [state, dispatch] = useFormState<CreateJobState, FormData>(
    createJob,
    initialState
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form action={dispatch} className="flex flex-wrap gap-6 p-4">
      <Input
        size="lg"
        label="Title"
        labelPlacement="outside"
        type="text"
        name="title"
        placeholder="Junior Next.js Developer"
        isInvalid={state.errors?.title ? true : false}
        value={formData?.title || ""}
        onChange={handleInputChange}
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
        labelPlacement="outside"
        name="description"
        minRows={8}
        maxRows={20}
        placeholder="Enter job's offer description"
        isInvalid={state.errors?.description ? true : false}
        value={formData?.description || ""}
        onChange={handleInputChange}
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
        labelPlacement="outside"
        type="email"
        name="email"
        placeholder="example@example.com"
        isInvalid={state.errors?.email ? true : false}
        value={formData?.email || ""}
        onChange={handleInputChange}
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
        label="Address"
        labelPlacement="outside"
        name="address"
        type="text"
        placeholder="Write company's address with postal code etc."
        isInvalid={state.errors?.address ? true : false}
        value={formData?.address}
        onChange={handleInputChange}
        errorMessage={
          state.errors?.address && (
            <>
              {state.errors.address.map((error) => (
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
        label="Company name"
        labelPlacement="outside"
        name="company"
        type="text"
        placeholder="Write company's name."
        isInvalid={state.errors?.company ? true : false}
        value={formData?.company}
        onChange={handleInputChange}
        errorMessage={
          state.errors?.company && (
            <>
              {state.errors.company.map((error) => (
                <p key={error} className="font-semibold">
                  {error}
                </p>
              ))}
            </>
          )
        }
        isRequired
      />
      <Divider className="my-4" />
      <div className="columns-1 md:columns-2">
        {jobChoices.map((choiceType) => (
          <Select
            key={choiceType.name}
            className="mb-4"
            size="lg"
            label={choiceType.label}
            name={choiceType.name}
            placeholder={choiceType.placeholder}
            isInvalid={
              state.errors && state.errors[choiceType.name] ? true : false
            }
            value={formData && formData[choiceType.name]}
            onChange={handleInputChange}
            fullWidth={false}
            isRequired
          >
            {choiceType.elements.map((element) => (
              <SelectItem key={element} value={element}>
                {element}
              </SelectItem>
            ))}
          </Select>
        ))}
      </div>

      <Input
        size="lg"
        className=" basis-[30%]"
        label="Salary"
        name="salary"
        type="number"
        min={0}
        max={1000000}
        placeholder="Write possible salary"
        isInvalid={state.errors?.salary ? true : false}
        value={formData?.salary.toString()}
        onChange={handleInputChange}
        errorMessage={
          state.errors?.salary && (
            <>
              {state.errors.salary.map((error) => (
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
        className=" basis-[30%]"
        label="Positions"
        name="positions"
        type="number"
        min={0}
        max={10000}
        placeholder="Write how many positions will be"
        isInvalid={state.errors?.positions ? true : false}
        value={formData?.positions.toString()}
        onChange={handleInputChange}
        errorMessage={
          state.errors?.positions && (
            <>
              {state.errors.positions.map((error) => (
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
        className="basis-[30%]"
        label="Last Date"
        name="lastDate"
        type="date"
        fullWidth={false}
        placeholder="Choose expiration date"
        isInvalid={state.errors?.lastDate ? true : false}
        value={formData?.lastDate.toString()}
        onChange={handleInputChange}
        errorMessage={
          state.errors?.lastDate && (
            <>
              {state.errors.lastDate.map((error) => (
                <p key={error} className="font-semibold">
                  {error}
                </p>
              ))}
            </>
          )
        }
        isRequired
      />

      <Button
        color="danger"
        type="submit"
        className="text-lg font-semibold self-center"
      >
        Add offer
      </Button>
      {state.message && (
        <p className="font-semibold text-danger text-tiny text-center">
          {state.message}
        </p>
      )}
    </form>
  );
};

export default CreateJobForm;
