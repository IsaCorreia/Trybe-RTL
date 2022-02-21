import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const titleEl = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(titleEl).toBeInTheDocument();
  });

  test(`Teste se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.`, () => {
    // O botão deve conter o texto Próximo pokémon;
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    renderWithRouter(<App />);

    const pokemonList = [
      /pikachu/i,
      /charmander/i,
      /caterpie/i,
      /ekans/i,
      /alakazam/i,
      /mew/i,
      /rapidash/i,
      /snorlax/i,
      /dragonair/i,
    ];
    const nextPokemon = () => {
      const nextPkmnButton = screen.getByText(/Próximo Pokémon/i);
      expect(nextPkmnButton).toBeInTheDocument();
      userEvent.click(nextPkmnButton);
    };
    pokemonList.forEach((current) => {
      const poke = screen.getByText(current);
      expect(poke).toBeInTheDocument();
      nextPokemon();
    });
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemonDetailsEl = screen.getAllByText(/More details/i);
    expect(pokemonDetailsEl).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    // O botão All precisa estar sempre visível.
    renderWithRouter(<App />);
    const pokemonTypes = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];

    pokemonTypes.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      const clearFilterButton = screen.getByRole('button', { name: /All/i });

      expect(typeButton && clearFilterButton).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // O texto do botão deve ser All;
    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    // Ao carregar a página, o filtro selecionado deverá ser All;
    renderWithRouter(<App />);
    const fireTypeButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireTypeButton);
    const clearFilterButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(clearFilterButton);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
