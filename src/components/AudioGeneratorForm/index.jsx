import React from 'react';
import { StyledButton, FormContainer, StyledTextField, ButtonContainer } from './style';

const AudioGeneratorForm = ({ audioPrompt, onAudioPromptChange, onSubmit, loading, file }) => {
  return (
    <FormContainer container spacing={2}>
      <StyledTextField
        label="Prompt"
        value={audioPrompt}
        onChange={(e) => onAudioPromptChange(e.target.value)}
        fullWidth
        margin="normal"
      />
      <ButtonContainer>
        {file ? (
          <StyledButton variant="contained" color="secondary" href={file} download>
            Baixar Áudio
          </StyledButton>
        ) : (
         <StyledButton variant="contained" color="primary" onClick={onSubmit} disabled={loading} style={{marginTop: '20px'}}>
            {loading ? 'Gerando...' : 'Gerar Áudio'}
          </StyledButton>
        )}
      </ButtonContainer>
    </FormContainer>
  );
};

export default AudioGeneratorForm;
