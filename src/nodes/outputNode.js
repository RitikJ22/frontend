// outputNode.js

import React from "react";
import { withNodeWrapper } from "../commonComponents/AbstractNode.js";
import { Position } from "reactflow";
import Input from "../commonComponents/Input.js";
import Select from "../commonComponents/Select.js";
import CancelIcon from '@mui/icons-material/Cancel';
import { Tooltip } from "@mui/material";


const OutputNodeComponent = ({ id, data, onChange,onClick }) => {
  const handleNameChange = (e) => {
    onChange("outputName", e.target.value);
  };

  const handleTypeChange = (e) => {
    onChange("outputType", e.target.value);
  };

  return (
    <div className="wrapper-node">
      <div className="header-node">
        <span>Output</span>
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
          id={id}
          outputName={data?.outputName}
          onChange={handleNameChange}
          placeholder={id.replace("customOutput-", "output_")}
        />
        <Select
          value={data?.outputType}
          onChange={handleTypeChange}
          options={["Text", "Image"]}
        />
      </div>
    </div>
  );
};

export const OutputNode = withNodeWrapper(
  OutputNodeComponent,
  { outputName: "", outputType: "Text" },
  [{ type: "target", position: Position.Left, id: "value" }]
);
