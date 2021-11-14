import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectTo = (shouldRedirect, path) => {
  if (shouldRedirect) {
    return (
      <Navigate to={ path } />
    );
  }
};

export default RedirectTo;
