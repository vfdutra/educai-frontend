import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  CircularProgress
} from '@mui/material';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import QuizIcon from '@mui/icons-material/Quiz';
import LessonPLanIcon from '@mui/icons-material/BorderColorTwoTone';

import AccordionItem from '../../components/AccordionItem/AccordionItem';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import LessonPlanDisplay from '../../components/LessonPlanDisplay/LessonPlanDisplay';

import { StyledGridItem } from './style';

export default function Home() {
  useEffect(() => {
    document.body.style.background = "#7AA2E3";
  }, []);

  const [audioExpanded, setAudioExpanded] = useState(false);
  const [slideExpanded, setSlideExpanded] = useState(false);
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [lessonPlanExpanded, setLessonPlanExpanded] = useState(false);

  const [audioPrompt, setAudioPrompt] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);

  const [slidePrompt, setSlidePrompt] = useState("");
  const [slideFile, setSlideFile] = useState(null);
  const [slideLoading, setSlideLoading] = useState(false);

  const [quizPrompt, setQuizPrompt] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [numberOfOptions, setNumberOfOptions] = useState(4);
  const [quiz, setQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  const [lessonPlanPrompt, setLessonPlanPrompt] = useState("");
  const [lessonPlan, setLessonPlan] = useState("");
  const [lessonPlanLoading, setLessonPlanLoading] = useState(false);

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
    setAudioLoading(true);
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
    } finally {
      setAudioLoading(false);
    }
  };

  const handleSlideSubmit = async () => {
    setSlideLoading(true);
    try {
      const response = await fetch('http://localhost:3333/create-slide', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: slidePrompt }),
      });

      if (response.ok) {
        handleOpenSnackbar('success', 'Slide criado com sucesso!');
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setSlideFile(url);
      } else {
        handleOpenSnackbar('error', 'Erro ao criar Slide');
      }
    } catch (error) {
      handleOpenSnackbar('error', 'Erro de network. Por favor, tente novamente mais tarde');
    } finally {
      setSlideLoading(false);
    }
  };

  const handleQuizSubmit = async () => {
    setQuizLoading(true);
    try {
      const response = await fetch('http://localhost:3333/generate-quiz', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          theme: quizPrompt, 
          numberOfQuestions, 
          numberOfOptions 
        }),
      });

      if (response.ok) {
        handleOpenSnackbar('success', 'Quiz criado com sucesso!');
        const data = await response.json();
        setQuiz(data.questions);
      } else {
        handleOpenSnackbar('error', 'Erro ao criar quiz');
      }
    } catch (error) {
      handleOpenSnackbar('error', 'Erro de network. Por favor, tente novamente mais tarde');
    } finally {
      setQuizLoading(false);
    }
  };

  const handleLessonPlanSubmit = async () => {
    setLessonPlanLoading(true);
    try {
      const response = await fetch('http://localhost:3333/generate-lesson-plan', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: lessonPlanPrompt }),
      });

      if (response.ok) {
        handleOpenSnackbar('success', 'Plano de aula criado com sucesso!');
        const data = await response.json();
        setLessonPlan(data.lessonPlan);
      } else {
        handleOpenSnackbar('error', 'Erro ao criar plano de aula');
      }
    } catch (error) {
      handleOpenSnackbar('error', 'Erro de network. Por favor, tente novamente mais tarde');
    } finally {
      setLessonPlanLoading(false);
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
              showPrompt={true}
              loading={audioLoading}
              file={audioFile}
              downloadLabel="Baixar Áudio"
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
              prompt={slidePrompt}
              onPromptChange={(e) => setSlidePrompt(e.target.value)}
              onSubmit={handleSlideSubmit}
              showPrompt={true}
              loading={slideLoading}
              file={slideFile}
              downloadLabel="Baixar Slide"
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
              prompt={quizPrompt}
              onPromptChange={(e) => setQuizPrompt(e.target.value)}
              onSubmit={handleQuizSubmit}
              showPrompt={false}
              loading={quizLoading}
            >
              <Grid container spacing={2} style={{ padding: '16px' }}>
                <Grid item xs={12}>
                  <TextField
                    label="Tema"
                    value={quizPrompt}
                    onChange={(e) => setQuizPrompt(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Número de Questões"
                    type="number"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Número de Opções por Questão"
                    type="number"
                    value={numberOfOptions}
                    onChange={(e) => setNumberOfOptions(parseInt(e.target.value))}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleQuizSubmit} >
                    Gerar Quiz
                  </Button>
                </Grid>
              </Grid>
            </AccordionItem>
            {quiz && !quizLoading && (
              <div style={{ padding: '16px' }}>
                <Typography variant="h6">Quiz</Typography>
                <List>
                  {quiz.map((q, index) => (
                    <div key={index}>
                      <Typography variant="subtitle1">{q.question}</Typography>
                      <List>
                        {q.options.map((option, i) => (
                          <ListItem key={i}>
                            <ListItemText primary={option} />
                          </ListItem>
                        ))}
                      </List>
                    </div>
                  ))}
                </List>
              </div>
            )}
          </Card>
        </StyledGridItem>
        <StyledGridItem xs={12}>
          <Card>
            <AccordionItem
              expanded={lessonPlanExpanded}
              onChange={() => setLessonPlanExpanded(!lessonPlanExpanded)}
              icon={<LessonPLanIcon />}
              title="Gerador de Plano de Aula"
              prompt={lessonPlanPrompt}
              onPromptChange={(e) => setLessonPlanPrompt(e.target.value)}
              onSubmit={handleLessonPlanSubmit}
              showPrompt={true}
              loading={lessonPlanLoading}
            />
            {lessonPlan && <LessonPlanDisplay lessonPlan={lessonPlan} />}
          </Card>
        </StyledGridItem>
      </Grid>

      <SnackbarAlert
        open={snackPack.success.open}
        message={snackPack.success.message}
        severity="success"
        onClose={handleCloseSnackbar('success')}
      />
      <SnackbarAlert
        open={snackPack.error.open}
        message={snackPack.error.message}
        severity="error"
        onClose={handleCloseSnackbar('error')}
      />
    </Container>
  );
}