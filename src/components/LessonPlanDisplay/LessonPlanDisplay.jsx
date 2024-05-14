import React from 'react';
import { Typography } from '@mui/material';

const LessonPlanDisplay = ({ lessonPlan }) => {
  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h6">Plano de Aula</Typography>
      <div dangerouslySetInnerHTML={{ __html: lessonPlan }} />
    </div>
  );
};

export default LessonPlanDisplay;
