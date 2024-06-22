// submit.js
import * as React from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from '@mui/material/Alert';
import "./styles/submit.css";


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1.5px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (nodes.length > 0 || edges.length > 0) {
      let data = {
        nodes: nodes,
        edges: edges,
      };

      let stringifiedData = JSON.stringify(data);

      try {
        const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: stringifiedData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setData(responseData?.data)

        handleOpen();
      } catch (error) {
        console.error("There has been a problem with fetch operation:", error);
      }
      return;
    }
    return alert("Data is empty!");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="buttonStyle"
        style={{
          margin: "30px 0px",
          width: "fit-content",
        }}
        onClick={handleSubmit}
      >
        Submit
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "900",textAlign:"center" }}
          >
            Information regarding Pipeline
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography  className="typoStyles">
              Number of Nodes: <span className="spanStyles">{data?.num_nodes || 0}</span>
            </Typography>
            <Typography  className="typoStyles">
              Number of Edges: <span className="spanStyles">{data?.num_edges || 0}</span>
            </Typography>
            {
              data?.is_dag && (
                <Alert  className="typoStyles" severity="info">This is a <span className="spanStyles">directed acyclic
                graph (DAG).</span> </Alert>
              )
            }
           
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
