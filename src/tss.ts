import { createTss } from 'tss-react';

function useContext() {
  const theme = {
    color: {
      surface: '#000E1C', 
      text: {
        primary: '#FAFAFA',
      },
    },
  };
  const dexTheme = {
    color: {
      surface: '#CFCFCF', 
      primary: '#AC0000', 
      secondary: '#FF7F50', 
      hover: '#FF3B3B', 
      cardBackground: '#474747',
      loadingBackground: '#AC0000',
      text: {
        primary: '#FFFFFF', 
        secondary: '#EAEAEA', 
        muted: '#888888',
      },
    },
    font: {
      family: 'Inter, sans-serif',
      sizes: {
        small: '0.875rem',
        base: '1rem',
        large: '1.25rem',
        title: '2rem',
      },
      weight: {
        regular: 400,
        medium: 500,
        bold: 600,
      },
    },
    borderRadius: '15px', 
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
  };
  return { theme, dexTheme };
}
export const { tss } = createTss({ useContext });

export const useStyles = tss.create({});
