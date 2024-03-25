"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { Key } from "react";
import { useDebouncedCallback } from "use-debounce";

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

const SearchStats = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleValueChange = useDebouncedCallback((id: Key) => {
    const params = new URLSearchParams(searchParams);

    if (!!id) {
      params.set("topic", id.toString());
    } else params.delete("topic");

    replace(`${pathname}?${params}`);
  }, 600);

  return (
    <Autocomplete
      allowsCustomValue={true}
      labelPlacement="outside"
      description="Search jobs stats typing or selecting phrase included in job's offer title"
      placeholder="Select or type phrase..."
      size="lg"
      aria-label="Select or type phrase"
      inputMode="text"
      onKeyDown={(e: any) => {
        e.continuePropagation();
      }}
      onValueChange={handleValueChange}
      onSelectionChange={handleValueChange}
      defaultInputValue={searchParams.get("topic")?.toString()}
      className="w-full my-4"
      defaultItems={techs}
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default SearchStats;
