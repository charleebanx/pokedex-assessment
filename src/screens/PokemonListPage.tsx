import React, { useState } from 'react';
import { tss } from '../tss';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import PokeGrid from 'src/components/PokeGrid';
import Search from 'src/components/Search';
import { LinearProgress } from '@mui/material';

/*
PokeListPage focuses on:
  - Packaging everything together by presenting PokeGrid
  - PokeGrid contains PokeListItem and PokeModal and formatted through there
  - PokeGrid is fully presented in PokeListPage
*/
export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data, loading, error } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter pokemon based on search term (client-side)
  const filteredPokemon = data.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className={classes.root}>
        <div className={classes.loadingContainer}>
          <h2>Fetching Poke Data...</h2>
          <LinearProgress className={classes.progressBar} />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={classes.root}>
        <div className={classes.errorContainer}>
          <h2>Could not fetch Poke Data (╥﹏╥)</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>PokéDex</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {filteredPokemon.length === 0 ? (
        <div className={classes.noResults}>
          <h2>No Pokémon found matching "{searchTerm}"</h2>
        </div>
      ) : (
        <PokeGrid pokemon={filteredPokemon} />
      )}
    </div>
  );
};

const useStyles = tss.create(({ dexTheme }) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#CFCFCF', 
    color: '#000000', 
    padding: '1.5rem',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2.5rem',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    backgroundColor: '#AC0000', 
    color: '#FFFFFF', 
    gap: '1rem',
    textAlign: 'center',
  },
  progressBar: {
    width: '300px',
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    textAlign: 'center',
    color: '#f44336',
  },
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '30vh',
    textAlign: 'center',
    marginTop: '2rem',
  },
}));