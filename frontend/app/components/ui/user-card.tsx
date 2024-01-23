"use client";

import { useAuthContext } from "@/app/context/auth-context";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const UserCard = () => {
  const { user } = useAuthContext();

  const profileData = [
    {
      rowVar: "First name",
      rowVal: user?.first_name,
    },
    {
      rowVar: "Last name",
      rowVal: user?.last_name,
    },
    {
      rowVar: "Email",
      rowVal: user?.email,
    },
  ];

  return (
    <Card className="md:basis-96 mx-4">
      <CardBody>
        <Table
          hideHeader
          shadow="none"
          fullWidth={false}
          aria-label="User profile data"
        >
          <TableHeader>
            <TableColumn>VAR</TableColumn>
            <TableColumn>VAL</TableColumn>
          </TableHeader>
          <TableBody items={profileData}>
            {(item) => (
              <TableRow key={item.rowVar}>
                <TableCell>
                  <p className="text-md lg:text-lg text-danger font-extrabold">
                    {item.rowVar}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-md text-wrap lg:text-lg">{item.rowVal}</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
      <CardFooter className="flex-col gap-4 md:flex-row flex justify-evenly wrap">
        <Button color="danger" className="font-semibold md:text-md">
          Edit
        </Button>
        <Button
          color="danger"
          variant="bordered"
          className="font-semibold md:text-md"
        >
          Change Password
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
