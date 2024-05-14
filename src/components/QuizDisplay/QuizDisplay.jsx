import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const QuizDisplay = ({ quiz }) => {
  return (
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
  );
};

export default QuizDisplay;
