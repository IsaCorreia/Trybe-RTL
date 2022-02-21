import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('4. Teste o componente <NotFound.js />', () => {
  test(`Teste se página contém um heading h2
  com o texto Page requested not found 😭; `, () => {
    const { history } = renderWithRouter(<App />);

    // Navega para uma página "Not Found"
    history.push('404');

    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);

    // Navega para uma página "Not Found"
    history.push('404');

    const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgEl = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(imgEl.src).toBe(IMG_URL);
  });
});
