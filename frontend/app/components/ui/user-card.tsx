import { UserType } from "@/app/lib/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const UserCard = ({ user }: { user: UserType }) => {
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
      <Divider />
      <CardFooter className="flex-col gap-4 md:gap-2 md:flex-row flex justify-evenly wrap">
        <Button
          as={Link}
          href="/user/edit"
          color="danger"
          variant="flat"
          fullWidth
          className="font-bold md:text-medium"
        >
          Edit
        </Button>
        <Button
          color="danger"
          variant="flat"
          fullWidth
          className="font-bold md:text-medium"
          isDisabled
        >
          Change Password
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
