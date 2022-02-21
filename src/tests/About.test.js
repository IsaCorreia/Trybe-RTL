import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutPokedexText = screen.getByText(
      /This application simulates a Pokédex/i,
    );
    expect(aboutPokedexText).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutTitleEl = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutTitleEl).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraphsEl = screen.queryAllByText(/Pokémons/i);
    expect(paragraphsEl).toHaveLength(2);
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgEl = screen.getByRole('img');
    expect(imgEl.src).toBe(imgURL);
  });
});
