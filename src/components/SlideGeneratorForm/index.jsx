import React from 'react';
import { StyledButton, FormContainer, StyledTextField, ButtonContainer } from './style';

const SlideGeneratorForm = ({ slidePrompt, onSlidePromptChange, onSubmit, loading, file }) => {
  return (
    <FormContainer container spacing={2}>
      <StyledTextField
        label="Prompt"
        value={slidePrompt}
        onChange={(e) => onSlidePromptChange(e.target.value)}
        fullWidth
        margin="normal"
      />
      <ButtonContainer>
        {file ? (
          <StyledButton variant="contained" color="secondary" href={file} download>
            Baixar Slide
          </StyledButton>
        ) : (
         <StyledButton variant="contained" color="primary" onClick={onSubmit} disabled={loading} style={{marginTop: '20px'}}>
            {loading ? 'Gerando...' : 'Gerar Slide'}
          </StyledButton>
        )}
      </ButtonContainer>
    </FormContainer>
  );
};

export default SlideGeneratorForm;
