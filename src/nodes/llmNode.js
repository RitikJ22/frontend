// llmNode.js

import React from "react";
import { withNodeWrapper } from "../commonComponents/AbstractNode.js";
import { Position } from "reactflow";
import CancelIcon from '@mui/icons-material/Cancel';
import { Tooltip } from "@mui/material";

const LLMNodeComponent = ({ id, data, onChange,onClick }) => {


  return (
    <div className="wrapper-node">
      <div className="header-node">
        <span>LLM</span>
        <Tooltip title={"Remove"} placement="right" arrow>
          <CancelIcon onClick={onClick} />
        </Tooltip>

      </div>
      <div
        className="form-node"
       
      >
        <p>This is LLM model</p>
      </div>
    </div>
  );
};

export const LLMNode = withNodeWrapper(LLMNodeComponent, { model: "" }, [
  { type: "source", position: Position.Right, id: "output" },
  {
    type: "target",
    position: Position.Left,
    id: "system",
    style: { top: `${100 / 3}%` },
  },
  {
    type: "target",
    position: Position.Left,
    id: "prompt",
    style: { top: `${200 / 3}%` },
  },
]);
