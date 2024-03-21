"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardHeader,
  Progress,
} from "@nextui-org/react";
import React from "react";

const techs = [
  {
    value: "next",
    label: "Next.js",
  },
  {
    value: "react",
    label: "React.js",
  },
  {
    value: "node",
    label: "Node.js",
  },
];

const StatsPage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Card className="max-w-[40rem] w-full">
        <CardHeader>
          <Autocomplete label="Select an animal" className="max-w-xs">
            {techs.map((tech) => (
              <AutocompleteItem key={tech.value} value={tech.value}>
                {tech.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </CardHeader>
        <CardBody>
          <Progress
            minValue={7000}
            value={11000}
            maxValue={15000}
            label={7000}
            showValueLabel
            formatOptions={{
              style: "currency",
              currency: "USD",
            }}
            color="danger"
            aria-label="position salary stats"
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default StatsPage;
