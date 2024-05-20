import React from 'react';

const LessonPlanDisplay = ({ lessonPlan }) => {
  return (
    <div style={{ padding: '16px' }}>
      <div dangerouslySetInnerHTML={{ __html: lessonPlan }} />
    </div>
  );
};

export default LessonPlanDisplay;
