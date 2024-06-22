import React, { useRef, useState, useEffect } from "react";
import { withNodeWrapper } from "../commonComponents/AbstractNode.js";
import { Handle, Position } from "reactflow";
import Input from "../commonComponents/Input.js";
import CancelIcon from "@mui/icons-material/Cancel";
import { Tooltip } from "@mui/material";

const TextNodeComponent = ({ id, data, onChange, onClick }) => {
  const [nodeWidth, setNodeWidth] = useState(200);
  const [nodeHeight, setNodeHeight] = useState(25);
  const textRef = useRef(null);
  const [handles, setHandles] = useState([]);
  const maxWidth = 400; // Set the maximum width

  const handleTextChange = (e) => {
    onChange("text", e.target.value);
  };

  useEffect(() => {
    if (textRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = "16px Arial"; // Set the font for accurate measurement
      const textWidth = context.measureText(data?.text || "").width;
      const textHeight = 16;

      const calculatedWidth = Math.min(maxWidth, Math.max(150, textWidth + 20));
      const calculatedHeight = Math.max(
        35,
        Math.ceil((textWidth + 20) / maxWidth) * (textHeight + 30)
      );

      setNodeWidth(calculatedWidth);
      setNodeHeight(calculatedHeight);
    }
  }, [data?.text]);

  useEffect(() => {
    const variablePattern = /\{\{\s*(\w+)\s*\}\}/g;
    const variables = [];
    let match;
    while ((match = variablePattern.exec(data?.text || "")) !== null) {
      variables.push(match[1]);
    }
    setHandles(variables);
  }, [data?.text]);

  return (
    <div className="wrapper-node">
      <div className="header-node">
        <span>Text</span>
        <Tooltip title={"Remove"} placement="right" arrow>
          <CancelIcon onClick={onClick} />
        </Tooltip>
      </div>
      <div className="form-node">
        <Input
          labelName={"Name"}
          data={data}
          id={id}
          outputName={data?.text}
          onChange={handleTextChange}
          style={{ width: `${nodeWidth}px`, height: `${nodeHeight}px` }}
          placeholder={"{{input}}"}
          ref={textRef}
          isTextarea={true} // Use textarea for multi-line input
        />
      </div>
      {handles.map((handle, index) => (
        <Handle
          key={`${handle}-${index}`}
          type="target"
          position={Position.Left}
          id={`handle-${handle}`}
          style={{
            top: `${(index + 1) * (90 / (handles.length + 1))}px`,
          }}
        />
      ))}
    </div>
  );
};

export const TextNode = withNodeWrapper(TextNodeComponent, { text: "" }, [
  { type: "source", position: Position.Right, id: "output" },
]);
