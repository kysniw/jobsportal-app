import { Checkbox, CheckboxGroup, Divider } from "@nextui-org/react";
import React from "react";

const Filters = () => {
  return (
    <div className="sticky flex flex-col gap-4 top-20">
      <CheckboxGroup label="Job types" color="danger">
        <Checkbox value="Permanent">Permanent</Checkbox>
        <Checkbox value="Temporary">Temporary</Checkbox>
        <Checkbox value="Intership">Intership</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup label="Education" color="danger">
        <Checkbox value="Bachelors">Bachelors</Checkbox>
        <Checkbox value="Masters">Masters</Checkbox>
        <Checkbox value="Phd">Phd</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup label="Industry" color="danger">
        <Checkbox value="business">Business</Checkbox>
        <Checkbox value="Information Technology">
          Information Technology
        </Checkbox>
        <Checkbox value="Banking">Banking</Checkbox>
        <Checkbox value="Education/Training">Education/Training</Checkbox>
        <Checkbox value="Telecomunication">Telecomunication</Checkbox>
        <Checkbox value="Others">Others</Checkbox>
      </CheckboxGroup>
      <CheckboxGroup label="Experience" color="danger">
        <Checkbox value="No experience">No experience</Checkbox>
        <Checkbox value="1 year">1 year</Checkbox>
        <Checkbox value="2 years">2 years</Checkbox>
        <Checkbox value="3 years plus">3 years plus</Checkbox>
      </CheckboxGroup>
    </div>
  );
};

export default Filters;
