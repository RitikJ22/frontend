// AbstractNode.js

import { useState } from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";

export const withNodeWrapper = (
  WrappedComponent,
  defaultData,
  handleConfig = []
) => {
  return ({ id, data }) => {
    const deleteNode = useStore((state) => state.deleteNode);
    const [nodeData, setNodeData] = useState({ ...defaultData, ...data });

    const handleChange = (key, value) => {
      setNodeData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    };
    const handleDelete = () => {
      deleteNode(id);
    };
    return (
      <div>
        {handleConfig.map((handle, index) => {
          let defaultStyle = {
            height: "7px",
            width: "7px",
          };

          let handleStyleUpdated = {...defaultStyle,...handle.style}
          return (
            <Handle
              key={index}
              type={handle.type}
              position={handle.position}
              id={`${id}-${handle.id}`}
              style={handleStyleUpdated || {}}
            />
          );
        })}
        <WrappedComponent
          id={id}
          data={nodeData}
          onChange={handleChange}
          onClick={handleDelete}
        />
      </div>
    );
  };
};
