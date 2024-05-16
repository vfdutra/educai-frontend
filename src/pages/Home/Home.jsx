import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
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
          {slideFile && !slideLoading && (
            <div style={{ padding: '16px' }}>
              <Typography variant="h6">Slide</Typography>
              <Button variant="contained" color="secondary" href={slideFile} download>
                Baixar Slide
              </Button>
            </div>
          )}
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
          {audioFile && !audioLoading && (
            <div style={{ padding: '16px' }}>
              <Typography variant="h6">Áudio</Typography>
              <Button variant="contained" color="secondary" href={audioFile} download>
                Baixar Áudio
              </Button>
            </div>
          )}
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
            file={lessonPlan ? URL.createObjectURL(new Blob([JSON.stringify(lessonPlan)], { type: 'application/json' })) : null}
          />
          {lessonPlan && !lessonPlanLoading && (
            <div style={{ padding: '16px' }}>
              <Typography variant="h6">Plano de Aula</Typography>
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
