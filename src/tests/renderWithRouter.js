import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  const page = render(
    <BrowserRouter history={ history }>
      {component}
    </BrowserRouter>,
  );

  return { history, ...page };
};

export default renderWithRouter;
