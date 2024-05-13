import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionItem = ({ expanded, onChange, icon, title, prompt, onPromptChange, onSubmit, file }) => (
  <Accordion expanded={expanded} onChange={onChange} style={{ width: "100%" }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={2}>
          <IconButton>{icon}</IconButton>
        </Grid>
        <Grid item xs={8}>
          <div>{title}</div>
        </Grid>
      </Grid>
    </AccordionSummary>
    <AccordionDetails style={{ height: "200%" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Texto"
            variant="outlined"
            fullWidth
            value={prompt}
            onChange={onPromptChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#7AA2E3" }}
            onClick={onSubmit}
          >
            OK
          </Button>
        </Grid>
        {file && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#6AD4DD" }}
              href={file}
              download="audio.mp3"
            >
              Download Audio
            </Button>
          </Grid>
        )}
      </Grid>
    </AccordionDetails>
  </Accordion>
);

export default AccordionItem;