import Tooltip from "@mui/material/Tooltip";
import "../styles/userInput.css";

const Select = ({ value, onChange, options }) => {
  return (
    <Tooltip title="Type" placement="right" arrow>
      <select value={value} onChange={onChange} className="select-Style">
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </Tooltip>
  );
};

export default Select;
