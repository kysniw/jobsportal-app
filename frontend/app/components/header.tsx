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
  Skeleton,
} from "@nextui-org/react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthContext } from "../context/auth-context";
import clsx from "clsx";
import ThemeSwitcher from "./theme-switcher";
import { navLinks } from "../utils/common";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const pathname = usePathname();

  const { user, isLoading, handleLogout } = useAuthContext();
  // console.log(user);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="h-20 fixed top-0"
    >
      <NavbarContent as="div" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        <NavbarBrand as={Link} href="/">
          <h1 className="font-medium">
            Jobs<span className="text-rose-500 font-extrabold">Portal</span>
          </h1>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent as="div" justify="center" className="hidden sm:flex">
        {navLinks.map((link) => (
          <NavbarItem key={link.label}>
            <Link
              className={clsx("duration-300 ", {
                "text-danger-400 hover:text-danger-400 font-bold":
                  pathname === link.href,
                "hover:text-foreground-500": pathname !== link.href,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent
        as="div"
        className="items-center animate-appearance-in"
        justify="end"
      >
        {user && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as={Button}
                isIconOnly
                isBordered
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
              <DropdownItem
                aria-label="my offers"
                key="offers"
                as={Link}
                href="/user/job"
              >
                <p>My offers</p>
              </DropdownItem>
              <DropdownItem
                aria-label="my applies"
                key="applies"
                as={Link}
                href="/user/job"
              >
                <p>My applies</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                textValue="Log out"
                onPress={handleLogout}
              >
                <p className="font-semibold text-danger" aria-label="logout">
                  Log Out
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        {!user && !isLoading && (
          <>
            <NavbarItem>
              <Button
                as={Link}
                color="danger"
                href="/auth/login"
                variant="ghost"
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
          </>
        )}
        {isLoading && <Skeleton className="flex rounded-full w-12 h-12" />}
        <ThemeSwitcher />
      </NavbarContent>
      <NavbarMenu>
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.label}>
            <Link
              className={clsx("block text-center py-4 w-full duration-300", {
                "text-danger-400 hover:text-danger-400 font-bold":
                  pathname === link.href,
                "hover:text-foreground-500": pathname !== link.href,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
