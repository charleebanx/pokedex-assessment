import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tss } from '../tss';
import { Pokemon } from 'src/hooks/useGetPokemons';
import PokeModal from './PokeModal';
import PokeListItem from './PokeListItem';

/*
PokeGrid focuses on:
  - formatting the PokeListItems
  - handling click open/close 
  - fetching data for the list item and modal respectively
 */
interface PokeGridProps {
  pokemon: Pokemon[];
}

const PokeGrid = ({ pokemon }: PokeGridProps) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handlePokemonClick = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handleCloseModal = () => {
    navigate('/');
  };

  return (
    <>
      <div className={classes.grid}>
        {pokemon.map((poke) => (
          <div
            key={poke.id}
            onClick={() => handlePokemonClick(poke.id)}
            className={classes.gridItem}
          >
            <PokeListItem
              id={poke.id}
              name={poke.name}
              types={poke.types}
              sprite={poke.sprite}
              height={poke.height}
              weight={poke.weight}
              stats={poke.stats}
            />
          </div>
        ))}
      </div>

      {id && <PokeModal pokemonId={id} onClose={handleCloseModal} />}
    </>
  );
};
// PokeGrid Styling
const useStyles = tss.create(({ dexTheme }) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(248px, 1fr))',
    gap: dexTheme.spacing.md,
    justifyContent: 'center',
  },
  gridItem: {
    cursor: 'pointer',
  },
}));

export default PokeGrid;