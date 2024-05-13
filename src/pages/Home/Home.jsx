import React, { useEffect, useState } from 'react';
import { Container, Grid, Card } from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import QuizIcon from '@mui/icons-material/Quiz';
import AccordionItem from '../AccordionItem/AccordionItem';
import SnackbarAlert from '../SnackbarAlert/SnackbarAlert';
import { StyledGridItem } from './style';

export default function Home() {
  useEffect(() => {
    document.body.style.background = "#7AA2E3";
  }, []);

  const [audioExpanded, setAudioExpanded] = useState(false);
  const [slideExpanded, setSlideExpanded] = useState(false);
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [audioPrompt, setAudioPrompt] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [snackPack, setSnackPack] = useState({
    success: { open: false, message: '' },
    error: { open: false, message: '' }
  });

  const handleOpenSnackbar = (type, message) => {
    setSnackPack(prev => ({
      ...prev,
      [type]: { open: true, message }
    }));
  };

  const handleCloseSnackbar = (type) => () => {
    setSnackPack(prev => ({
      ...prev,
      [type]: { open: false }
    }));
  };

  const handleAudioSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3333/create-audio', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: audioPrompt }),
      });

      if (response.ok) {
        handleOpenSnackbar('success', 'Áudio criado com sucesso!');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setAudioFile(url);
      } else {
        handleOpenSnackbar('error', 'Erro ao criar áudio');
      }
    } catch (error) {
      handleOpenSnackbar('error', 'Erro de network. Por favor, tente novamente mais tarde');
    }
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
        <StyledGridItem xs={12}>
          <Card>
            <AccordionItem
              expanded={audioExpanded}
              onChange={() => setAudioExpanded(!audioExpanded)}
              icon={<AudiotrackIcon />}
              title="Gerador de Áudio"
              prompt={audioPrompt}
              onPromptChange={(e) => setAudioPrompt(e.target.value)}
              onSubmit={handleAudioSubmit}
              file={audioFile}
            />
          </Card>
        </StyledGridItem>
        <StyledGridItem xs={12}>
          <Card>
            <AccordionItem
              expanded={slideExpanded}
              onChange={() => setSlideExpanded(!slideExpanded)}
              icon={<SlideshowIcon />}
              title="Gerador de Slide"
            />
          </Card>
        </StyledGridItem>
        <StyledGridItem xs={12}>
          <Card>
            <AccordionItem
              expanded={quizExpanded}
              onChange={() => setQuizExpanded(!quizExpanded)}
              icon={<QuizIcon />}
              title="Gerador de Quiz"
            />
          </Card>
        </StyledGridItem>
      </Grid>

      <SnackbarAlert
        open={snackPack.success.open}
        message={snackPack.success.message}
        severity="success"
        onClose={() => handleCloseSnackbar('success')}
      />
      <SnackbarAlert
        open={snackPack.error.open}
        message={snackPack.error.message}
        severity="error"
        onClose={() => handleCloseSnackbar('error')}
      />
    </Container>
  );
}