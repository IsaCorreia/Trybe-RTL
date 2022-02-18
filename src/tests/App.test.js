// Primeiro commit, let`s go!
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitleEl = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(homeTitleEl).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitleEl = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutTitleEl).toBeInTheDocument();
  });

  test.skip(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {

  });

  test.skip(`Teste se a aplicação é redirecionada para a página
  Not Found ao entrar em uma URL desconhecida.`, () => {

  });
});
