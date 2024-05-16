import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionItem = ({ expanded, onChange, icon, title, prompt, onPromptChange, onSubmit, file, children, showPrompt, loading, downloadLabel }) => (
  <Accordion expanded={expanded} onChange={onChange} style={{ width: "100%", position: 'relative' }}>
    {loading && (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 2,
      }}>
        <CircularProgress />
      </div>
    )}
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      style={{ zIndex: 1 }}
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
    <AccordionDetails style={{ height: "200%", zIndex: 1 }}>
      <Grid container spacing={2} alignItems="center">
        {showPrompt && (
          <>
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
                style={{ backgroundColor: "#1976d2" }}
                onClick={onSubmit}
              >
                OK
              </Button>
            </Grid>
          </>
        )}
        {!showPrompt && children}
        {file && (
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#6AD4DD" }}
              href={file}
              download
            >
              {downloadLabel}
            </Button>
          </Grid>
        )}
      </Grid>
    </AccordionDetails>
  </Accordion>
);

export default AccordionItem;
