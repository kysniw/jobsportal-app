"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";

import Link from "next/link";
import { useAuthContext } from "../context/auth-context";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user, isLoading, handleLogout } = useAuthContext();

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="fixed"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" color="foreground">
            <h1 className=" font-medium">
              Jobs<span className="text-rose-500 font-extrabold">Portal</span>
            </h1>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Input
          classNames={{
            base: "sm:max-w-[10rem] md:max-w-full h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="md"
          type="search"
          className="w-80"
        />
      </NavbarContent>
      {user && (
        <NavbarContent
          as="div"
          className="items-center animate-appearance-in"
          justify="end"
        >
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="danger"
                name={user.first_name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                aria-label="Profile Email"
                key="profile"
                className="h-14 gap-2"
                as={Link}
                href="/user"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="offers" aria-label="my offers">
                <p>My offers</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                textValue="Log out"
                onClick={handleLogout}
              >
                <p className="font-semibold text-danger" aria-label="logout">
                  Log Out
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
      {!user && !isLoading && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              color="danger"
              href="/auth/login"
              variant="bordered"
              className="font-semibold"
            >
              Sign In
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              color="danger"
              href="/auth/register"
              variant="flat"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#" aria-current="page" color="danger">
            Customers
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
