"use client";

import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { jobChoices } from "../../../utils/common";

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name) {
      if (e.target.checked) {
        params.append(e.target.name, e.target.value);
      } else {
        params.delete(e.target.name, e.target.value);
      }
    }
  };

  const handleFilterSubmit = () => {
    if (params.has("page")) {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col flex-wrap gap-4 mr-3 z-10">
      {jobChoices.map((filter) => {
        return (
          <CheckboxGroup
            key={filter.name}
            name={filter.name}
            label={filter.label}
            color="danger"
            classNames={{
              label: "text-xl font-semibold ",
            }}
            defaultValue={searchParams.getAll(filter.name)}
          >
            {filter.elements.map((checkbox) => (
              <Checkbox key={checkbox} value={checkbox} onChange={handleCheck}>
                {checkbox.at(0)?.toLocaleUpperCase() + checkbox.slice(1)}
              </Checkbox>
            ))}
          </CheckboxGroup>
        );
      })}
      <Button
        className="text-md font-bold"
        type="submit"
        color="danger"
        onClick={handleFilterSubmit}
      >
        Filter
      </Button>
    </div>
  );
};

export default Filters;
