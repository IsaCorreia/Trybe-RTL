import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  test(`é exibido na tela a mensagem "No favorite pokemon found",
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavsText = screen.getByText(/No favorite pokemon found/i);
    expect(noFavsText).toBeInTheDocument();
  });
  test('é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    // Navega até os detalhes do primeiro pokémon (pikachu)
    const firstPokemonDetailsLink = screen.getByText(/More details/i);
    userEvent.click(firstPokemonDetailsLink);

    // Favorita primeiro pokémon
    const firstPokemonFavCheckbox = screen.getByText(/Pokémon favoritado/i);
    userEvent.click(firstPokemonFavCheckbox);

    // Navega para Home
    const homeLink = screen.getByText(/Home/i);
    userEvent.click(homeLink);

    // Troca o pokémon, entra nos detalhes, favorita (charmander)
    const nextPokemonButton = screen.getByText(/Próximo Pokémon/i);
    userEvent.click(nextPokemonButton);

    // Navega até os detalhes do segundo pokémon (pikachu)
    const secondPokemonDetailsLink = screen.getByText(/More details/i);
    userEvent.click(secondPokemonDetailsLink);

    // Favorita segundo pokémon
    const secondPokemonFavCheckbox = screen.getByText(/Pokémon favoritado/i);
    userEvent.click(secondPokemonFavCheckbox);

    // Navega para a pág de Pokemons Favoritos
    const favPokeLink = screen.getByText(/Favorite Pokémons/i);
    userEvent.click(favPokeLink);

    const favPoke1 = screen.getByText(/Pikachu/i);
    const favPoke2 = screen.getByText(/Charmander/i);
    expect(favPoke1 && favPoke2).toBeInTheDocument();
  });
});
