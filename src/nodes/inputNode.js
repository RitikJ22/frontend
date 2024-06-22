// inputNode.js

import React from "react";
import { withNodeWrapper } from "../commonComponents/AbstractNode.js";
import { Position } from "reactflow";
import "../styles/nodes.css";
import Input from "../commonComponents/Input.js";
import Select from "../commonComponents/Select.js";
import CancelIcon from "@mui/icons-material/Cancel";
import { Tooltip } from "@mui/material";

const InputNodeComponent = ({ id, data, onChange, onClick }) => {
  const handleNameChange = (e) => {
    onChange("inputName", e.target.value);
  };

  const handleTypeChange = (e) => {
    onChange("inputType", e.target.value);
  };

  return (
    <div className="wrapper-node">
      <div className="header-node">
        <span>Input</span>
        <Tooltip title={"Remove"} placement="right" arrow>
          <CancelIcon onClick={onClick} />
        </Tooltip>
      </div>
      <div
        className="form-node"
        
      >
        <Input
          labelName={"Name"}
          data={data}
          outputName={data?.inputName}
          id={id}
          onChange={handleNameChange}
          placeholder={id.replace("customInput-", "input_")}
        />

        <Select
          value={data?.inputType}
          onChange={handleTypeChange}
          options={["Text", "File"]}
        />
      </div>
    </div>
  );
};

export const InputNode = withNodeWrapper(
  InputNodeComponent,
  { inputName: "", inputType: "Text" },
  [{ type: "source", position: Position.Right, id: "output" }]
);
