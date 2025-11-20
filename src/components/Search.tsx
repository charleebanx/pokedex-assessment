import React from 'react';
import TextField from '@mui/material/TextField';
import { tss } from '../tss';
/*
Search focuses on:
  - search logic
  - search event handling
*/
interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
  const { classes } = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={classes.searchBar}>
      <TextField
        id="outlined-basic"
        label="Enter Pokémon name..."
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        fullWidth
        className={classes.textField}
      />
    </div>
  );
};

const useStyles = tss.create(({ dexTheme }) => ({
  searchBar: {
    maxWidth: '600px',
    margin: '0 auto 2rem',
    width: '100%',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: dexTheme.color.surface,
      '&:hover fieldset': {
        borderColor: dexTheme.color.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: dexTheme.color.primary,
      },
    },
    '& .MuiInputLabel-root': {
      color: dexTheme.color.text.secondary,
      '&.Mui-focused': {
        color: dexTheme.color.primary,
      },
    },
    '& .MuiOutlinedInput-input': {
      color: dexTheme.color.text.primary,
    },
  },
}));

export default Search;