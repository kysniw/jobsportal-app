import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner color="danger" />
    </div>
  );
};

export default Loading;
