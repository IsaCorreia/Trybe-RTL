import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do Pokémon
  selecionado são mostradas na tela.`, () => {
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const { history } = renderWithRouter(<App />);
    const pikachuData = data.find((el) => el.name === 'Pikachu');
    const detailText = pikachuData.summary;
    history.push(`/pokemons/${pikachuData.id}`);

    const titleEl = screen.getByRole('heading', {
      name: `${pikachuData.name} Details`,
      level: 2,
    });
    expect(titleEl).toBeInTheDocument();

    const summaryEl = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryEl).toBeInTheDocument();

    const detailsEl = screen.getByText(detailText);
    expect(detailsEl).toBeInTheDocument();
  });
  it(`Teste se existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    // Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    // A imagem da localização deve ter um atributo src com a URL da localização;
    // A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
    const { history } = renderWithRouter(<App />);
    const pikachuData = data.find((el) => el.name === 'Pikachu');
    history.push(`/pokemons/${pikachuData.id}`);

    const gameLocEl = screen.getByRole('heading', {
      name: `Game Locations of ${pikachuData.name}`,
    });
    expect(gameLocEl).toBeInTheDocument();

    pikachuData.foundAt.forEach((element) => {
      const locationEl = screen.getByText(`${element.location}`);
      expect(locationEl).toBeInTheDocument();

      const locationMapEl = screen.getAllByAltText(`${pikachuData.name} location`);
      const currentLocationMapEl = locationMapEl.filter((el) => el.src === element.map);
      expect(currentLocationMapEl[0]).toHaveAttribute('src', element.map);
    });
  });
  it(`Teste se o usuário pode favoritar
  um pokémon através da página de detalhes.`, () => {
    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    // O label do checkbox deve conter o texto Pokémon favoritado?;
    const { history } = renderWithRouter(<App />);
    const pikachuData = data.find((el) => el.name === 'Pikachu');
    history.push(`/pokemons/${pikachuData.id}`);

    const favoriteCheckboxEl = screen.getByText('Pokémon favoritado?');
    expect(favoriteCheckboxEl).toBeInTheDocument();

    userEvent.click(favoriteCheckboxEl);
    let favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    expect(favoritePokemons).toContain(pikachuData.id);

    userEvent.click(favoriteCheckboxEl);
    favoritePokemons = JSON.parse(localStorage.getItem('favoritePokemonIds'));
    expect(favoritePokemons).not.toContain(pikachuData.id);
  });
});
