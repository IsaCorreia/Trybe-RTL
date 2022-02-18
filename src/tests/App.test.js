// Primeiro commit, let`s go!
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test(`Teste se o topo da aplicação contém os links:
  1º possuir o texto Home,
  2º possuir o texto About
  e 3º possuir o texto Favorite Pokémons.`, () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favPkmnLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink && aboutLink && favPkmnLink).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {

  });

  test(`Teste se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação.`, () => {

  });

  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {

  });

  test(`Teste se a aplicação é redirecionada para a página
  Not Found ao entrar em uma URL desconhecida.`, () => {

  });
});
