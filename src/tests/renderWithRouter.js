import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const renderWithRouter = (component) => render(
  <BrowserRouter>
    {component}
  </BrowserRouter>,
);

export default renderWithRouter;
