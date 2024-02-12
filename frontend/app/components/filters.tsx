"use client";

import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const filters = [
  {
    name: "job_types",
    label: "Job types",
    checkboxes: ["Permanent", "Temporary", "Intership"],
  },
  {
    name: "education",
    label: "Education",
    checkboxes: ["Bachelors", "Masters", "Phd"],
  },
  {
    name: "industry",
    label: "Industry",
    checkboxes: [
      "business",
      "Information Technology",
      "Banking",
      "Education/Training",
      "Telecomunication",
      "Others",
    ],
  },
  {
    name: "experience",
    label: "Experience",
    checkboxes: ["No experience", "1 year", "2 years", "3 years plus"],
  },
];

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  console.log(searchParams);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name);

    if (e.target.name) {
      if (e.target.checked) {
        params.append(e.target.name, e.target.value);
      } else {
        params.delete(e.target.name, e.target.value);
      }
    }
  };

  const handleFilterSubmit = () => {
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="sticky hidden lg:flex flex-col gap-4 top-20 mr-3">
      {filters.map((filter) => {
        // console.log(filter.name.at(0)?.toUpperCase());
        return (
          <CheckboxGroup
            key={filter.name}
            name={filter.name}
            label={filter.label}
            color="danger"
            defaultValue={searchParams.getAll(filter.name)}
          >
            {filter.checkboxes.map((checkbox) => (
              <Checkbox
                key={checkbox}
                value={checkbox}
                onChange={(e) => handleCheck(e)}
              >
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
