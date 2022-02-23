import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('6. Teste o componente <Pokemon.js />', () => {
  test(`Teste se é renderizado um card com as informações
  de determinado pokémon.`, () => {
    // O nome correto do Pokémon deve ser mostrado na tela;
    // O tipo correto do pokémon deve ser mostrado na tela.
    // O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

    const pokemonsToCheck = {
      pikachu: ['https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png', /pikachu/i, /electric/i, /Average weight: 6.0 kg/i, /Pikachu sprite/i],
      charmander: ['https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png', /charmander/i, /fire/i, /average weight: 8.5 kg/i, /charmander sprite/i],
      caterpie: ['https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png', /caterpie/i, /bug/i, /average weight: 2.9 kg/i, /caterpie sprite/i],
    };

    const checksPokemon = (poke) => {
      const IMG_URL = poke[0];
      const pokemonName = screen.getByText(poke[1]);
      const pokemonType = screen.getAllByText(poke[2]);
      const pokemonWeigth = screen.getByText(poke[3]);
      const pokemonImage = screen.getByAltText(poke[4]);
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonType).toHaveLength(2);
      expect(pokemonWeigth).toBeInTheDocument();
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage.src).toBe(IMG_URL);
    };

    checksPokemon(pokemonsToCheck.pikachu);
    userEvent.click(nextButton);
    checksPokemon(pokemonsToCheck.charmander);
    userEvent.click(nextButton);
    checksPokemon(pokemonsToCheck.caterpie);
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém
  um link de navegação para exibir detalhes deste Pokémon.
  O link deve possuir a URL /pokemons/<id>,
  onde <id> é o id do Pokémon exibido;`, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test(`Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para
  a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde < id > é o id do Pokémon cujos detalhes se deseja ver; `, () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const titleEl = screen.getByText(/Pikachu Details/i);
    expect(titleEl).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    // O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg;
    // A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const favoritePokeEl = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(favoritePokeEl);
    const starIconEl = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(starIconEl).toBeInTheDocument();
    expect(starIconEl).toHaveAttribute('src', '/star-icon.svg');
  });
});
