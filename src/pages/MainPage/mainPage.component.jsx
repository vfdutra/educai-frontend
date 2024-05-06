import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Grid,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import QuizIcon from "@mui/icons-material/Quiz";

export default function MainPage() {
  useEffect(() => {
    document.body.style.background = "#7AA2E3";
  }, []);

  const [audioExpanded, setAudioExpanded] = useState(false);
  const [slideExpanded, setSlideExpanded] = useState(false);
  const [quizExpanded, setQuizExpanded] = useState(false);

  const handleAudioAccordionChange = () => {
    setAudioExpanded(!audioExpanded);
  };

  const handleSlideAccordionChange = () => {
    setSlideExpanded(!slideExpanded);
  };

  const handleQuizAccordionChange = () => {
    setQuizExpanded(!quizExpanded);
  };

  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
         <Grid
          item
          xs={12}
          style={{
            width: "100%",
            backgroundColor: "#F8F6E3",
            border: "1px solid #6AD4DD",
            borderRadius: "12px",
            padding: "16px",
            margin: "8px 0",
          }}
        >
          <Card
         
          >
            <Accordion
              expanded={audioExpanded}
              onChange={handleAudioAccordionChange}
              style={{ width: "100%" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={2}>
                    <IconButton>
                      <AudiotrackIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={8}>
                    <div>Gerador de Áudio</div>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails style={{ height: "200%" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <TextField label="Texto" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7AA2E3" }}
                    >
                      OK
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            width: "100%",
            backgroundColor: "#F8F6E3",
            border: "1px solid #6AD4DD",
            borderRadius: "12px",
            padding: "16px",
            margin: "8px 0",
          }}
        >
          <Card
         
          >
            <Accordion
              expanded={slideExpanded}
              onChange={handleSlideAccordionChange}
              style={{ width: "100%" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={2}>
                    <IconButton>
                      <SlideshowIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={8}>
                    <div>Gerador de Slide</div>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails style={{ height: "200%" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <TextField label="Texto" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7AA2E3" }}
                    >
                      OK
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            width: "100%",
            backgroundColor: "#F8F6E3",
            border: "1px solid #6AD4DD",
            borderRadius: "12px",
            padding: "16px",
            margin: "8px 0",
          }}
        >
          <Card>
            <Accordion
              expanded={quizExpanded}
              onChange={handleQuizAccordionChange}
              style={{ width: "100%" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={2}>
                    <IconButton>
                      <QuizIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={8}>
                    <div>Gerador de Quiz</div>
                  </Grid>
                </Grid>
              </AccordionSummary>
              <AccordionDetails style={{ height: "200%" }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <TextField label="Texto" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#7AA2E3" }}
                    >
                      OK
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
