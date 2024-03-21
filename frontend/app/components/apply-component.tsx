"use client";

import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { applyToJob } from "../lib/jobs/actions";

const ApplyComponent = ({ id }: { id: string }) => {
  const [message, setMessage] = useState<string>();

  const handleApply = async () => {
    const applyResponse = await applyToJob(id);

    if (applyResponse.is_candidate) setMessage("Applied successfully!");
    else if (applyResponse.error) setMessage(applyResponse.error);
    else if (applyResponse.detail) setMessage(applyResponse.detail);
  };

  return (
    <div className="max-w-full p-10">
      <Button
        onPress={handleApply}
        color="danger"
        className="text-lg font-bold w-full"
      >
        Apply
      </Button>
      {message && (
        <p className="p-2 text-danger text-center font-semibold">{message}</p>
      )}
    </div>
  );
};

export default ApplyComponent;
