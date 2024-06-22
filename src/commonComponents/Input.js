import "../styles/userInput.css";
import Tooltip from "@mui/material/Tooltip";
import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      labelName,
      outputName,
      data,
      id,
      onChange,
      type = "text",
      placeholder,
      style = {},
      isTextarea = false,
    },
    ref
  ) => {
    return (
      <Tooltip title={labelName} placement="right" arrow>
        {isTextarea ? (
          <textarea
            style={style}
            ref={ref}
            value={outputName}
            onChange={onChange}
            placeholder={placeholder}
            className="input-Style textarea-Style"
          />
        ) : (
          <input
            style={style}
            ref={ref}
            type={type}
            value={outputName}
            onChange={onChange}
            placeholder={placeholder}
            className="input-Style"
          />
        )}
      </Tooltip>
    );
  }
);

export default Input;
