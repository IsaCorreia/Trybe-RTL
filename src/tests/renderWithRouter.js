import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  const page = render(
    <Router history={ history }>
      {component}
    </Router>,
  );

  return { history, ...page };
};

export default renderWithRouter;
