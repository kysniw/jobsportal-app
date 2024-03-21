"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isSelected, setIsSelected] = useState(theme === "light");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSelected = (selected: boolean) => {
    setIsSelected(selected);
    if (selected) setTheme("light");
    else setTheme("dark");
  };

  return (
    <Switch
      isSelected={isSelected}
      onValueChange={handleSelected}
      size="lg"
      color="danger"
      startContent={<FaSun />}
      endContent={<FaMoon />}
    ></Switch>
  );
};

export default ThemeSwitcher;
