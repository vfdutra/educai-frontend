import React from 'react';
import { StyledButton, FormContainer, StyledTextField, ButtonContainer } from './style';

const QuizForm = ({ 
  quizPrompt, 
  numberOfQuestions, 
  numberOfOptions, 
  onQuizPromptChange, 
  onNumberOfQuestionsChange, 
  onNumberOfOptionsChange, 
  onSubmit, 
  loading, 
  file 
}) => {
  return (
    <FormContainer container spacing={2}>
      <StyledTextField
        label="Tema"
        value={quizPrompt}
        onChange={(e) => onQuizPromptChange(e.target.value)}        
        fullWidth
        margin="normal"
      />
      <StyledTextField
        label="Número de Questões"
        type="number"
        value={numberOfQuestions}
        onChange={(e) => onNumberOfQuestionsChange(parseInt(e.target.value))}
        fullWidth
        margin="normal"
      />
      <StyledTextField
        label="Número de Opções por Questão"
        type="number"
        value={numberOfOptions}
        onChange={(e) => onNumberOfOptionsChange(parseInt(e.target.value))}
        fullWidth
        margin="normal"
      />
      <ButtonContainer>
        {file ? (
          <StyledButton variant="contained" color="secondary" href={file} download>
            Baixar Quiz
          </StyledButton>
        ) : (
          <StyledButton variant="contained" color="primary" onClick={onSubmit} disabled={loading} style={{marginTop: '20px'}}>
            {loading ? 'Gerando...' : 'Gerar Quiz'}
          </StyledButton>
        )}
      </ButtonContainer>
    </FormContainer>
  );
};

export default QuizForm;
