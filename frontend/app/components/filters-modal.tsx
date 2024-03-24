"use client";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { FaFilter } from "react-icons/fa";
import { jobChoices } from "../utils/common";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const FiltersModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  // console.log(searchParams);

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
    if (params.has("page")) {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Button
        isIconOnly
        size="lg"
        color="danger"
        variant="ghost"
        onPress={onOpen}
      >
        <FaFilter />
      </Button>
      <Modal
        isOpen={isOpen}
        placement="top"
        backdrop="blur"
        onOpenChange={onOpenChange}
        className="max-w-full w-fit lg:hidden"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader></ModalHeader>
              <ModalBody className="overflow-x-auto">
                <div className="flex flex-col max-h-[70vh] gap-4 flex-wrap">
                  {jobChoices.map((filter) => {
                    // console.log(filter.name.at(0)?.toUpperCase());
                    return (
                      <CheckboxGroup
                        key={filter.name}
                        name={filter.name}
                        label={filter.label}
                        color="danger"
                        classNames={{
                          label: "text-xl font-semibold ",
                          wrapper: "min-w-64",
                        }}
                        defaultValue={searchParams.getAll(filter.name)}
                      >
                        {filter.elements.map((checkbox) => (
                          <Checkbox
                            key={checkbox}
                            value={checkbox}
                            onChange={handleCheck}
                          >
                            {checkbox.at(0)?.toLocaleUpperCase() +
                              checkbox.slice(1)}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="text-md font-bold w-full"
                  type="submit"
                  color="danger"
                  onPress={() => {
                    handleFilterSubmit();
                    onClose();
                  }}
                >
                  Filter
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default FiltersModal;
