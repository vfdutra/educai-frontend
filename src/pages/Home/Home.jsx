import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';
import AccordionItem from '../../components/AccordionItem';
import SnackbarAlert from '../../components/SnackbarAlert/SnackbarAlert';
import LessonPlanDisplay from '../../components/LessonPlanDisplay/LessonPlanDisplay';

import QuizForm from '../../components/QuizForm';
import SlideGeneratorForm from '../../components/SlideGeneratorForm';
import AudioGeneratorForm from '../../components/AudioGeneratorForm';
import LessonPlanForm from '../../components/LessonPlanForm';

import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import QuizIcon from '@mui/icons-material/Quiz';
import LessonPLanIcon from '@mui/icons-material/BorderColorTwoTone';

import { AccordionContainer } from './style';

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

  const apiUrl = process.env.REACT_APP_API_URL;

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
      const response = await fetch(`${apiUrl}/create-audio`, {
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
      const response = await fetch(`${apiUrl}/create-presentation`, {
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
      const response = await fetch(`${apiUrl}/generate-quiz`, {
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
      const response = await fetch(`${apiUrl}/generate-class-plan`, {
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
      <AccordionContainer>
        <AccordionItem
          icon={<QuizIcon />}
          title="Quiz Generator"
          index={0}
          isActive={quizExpanded}
          onClick={() => setQuizExpanded(!quizExpanded)}
        >
          <QuizForm
            quizPrompt={quizPrompt}
            numberOfQuestions={numberOfQuestions}
            numberOfOptions={numberOfOptions}
            onQuizPromptChange={setQuizPrompt}
            onNumberOfQuestionsChange={setNumberOfQuestions}
            onNumberOfOptionsChange={setNumberOfOptions}
            onSubmit={handleQuizSubmit}
            loading={quizLoading}
            file={quiz ? URL.createObjectURL(new Blob([JSON.stringify(quiz)], { type: 'application/json' })) : null}
          />
          {quiz && !quizLoading && (
            <div style={{ padding: '16px' }}>
              <Grid container spacing={2}> 
                  {quiz.map((q, index) => (                  
                    <Grid item xs={12} md={6} key={index}>
                      <Typography variant="subtitle1">{q.question}</Typography>
                      <List>
                        {q.options.map((option, i) => (
                          <ListItem key={i}> 
                            <ListItemText 
                              primary={option} 
                              primaryTypographyProps={{ 
                                style: { fontWeight: q.answer === option ? 'bold' : 'normal' } 
                              }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  ))}
              </Grid>
            </div>
          )}
        </AccordionItem>

        <AccordionItem
          icon={<SlideshowIcon />}
          title="Slide Generator"
          index={1}
          isActive={slideExpanded}
          onClick={() => setSlideExpanded(!slideExpanded)}
        >
          <SlideGeneratorForm
            slidePrompt={slidePrompt}
            onSlidePromptChange={setSlidePrompt}
            onSubmit={handleSlideSubmit}
            loading={slideLoading}
            file={slideFile}
          />         
        </AccordionItem>

        <AccordionItem
          icon={<AudiotrackIcon />}
          title="Audio Generator"
          index={2}
          isActive={audioExpanded}
          onClick={() => setAudioExpanded(!audioExpanded)}
        >
          <AudioGeneratorForm
            audioPrompt={audioPrompt}
            onAudioPromptChange={setAudioPrompt}
            onSubmit={handleAudioSubmit}
            loading={audioLoading}
            file={audioFile}
          />          
        </AccordionItem>

        <AccordionItem
          icon={<LessonPLanIcon />}
          title="Class Script Generator"
          index={3}
          isActive={lessonPlanExpanded}
          onClick={() => setLessonPlanExpanded(!lessonPlanExpanded)}
        >
          <LessonPlanForm
            lessonPlanPrompt={lessonPlanPrompt}
            onLessonPlanPromptChange={setLessonPlanPrompt}
            onSubmit={handleLessonPlanSubmit}
            loading={lessonPlanLoading}
            file={lessonPlan ? null : null}
          />
          {lessonPlan && !lessonPlanLoading && (
            <div style={{ padding: '16px' }}>
              <LessonPlanDisplay lessonPlan={lessonPlan} />
            </div>
          )}
        </AccordionItem>
      </AccordionContainer>

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
