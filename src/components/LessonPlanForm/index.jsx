import React from 'react';
import { StyledButton, FormContainer, StyledTextField, ButtonContainer } from './style';

const LessonPlanForm = ({ lessonPlanPrompt, onLessonPlanPromptChange, onSubmit, loading, file }) => {
  return (
    <FormContainer container spacing={2}>
      <StyledTextField
        label="Prompt"
        value={lessonPlanPrompt}
        onChange={(e) => onLessonPlanPromptChange(e.target.value)}
        fullWidth
        margin="normal"
      />
      <ButtonContainer>
        {file ? (
          <StyledButton variant="contained" color="secondary" href={file} download>
            Baixar Plano de Aula
          </StyledButton>
        ) : (
         <StyledButton variant="contained" color="primary" onClick={onSubmit} disabled={loading} style={{marginTop: '20px'}}>
            {loading ? 'Gerando...' : 'Gerar Plano de Aula'}
          </StyledButton>
        )}
      </ButtonContainer>
    </FormContainer>
  );
};

export default LessonPlanForm;
