import { useQuery } from '@apollo/client/react';
import { Dialog, DialogContent, DialogTitle, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { tss } from '../tss';
import { GET_POKEMONS_DETAILS } from 'src/hooks/useGetPokemons';

/*
PokeModal focuses on: 
  - Presenting the data as a modal
  - Presenting more pokemon information on top of the required information
*/
interface PokeModalProps {
  pokemonId: string;
  pokemon?: any;
  onClose: () => void;
}

const PokeModal = ({ pokemonId, onClose }: PokeModalProps) => {
  const { classes } = useStyles();
  const { data, loading, error } = useQuery(GET_POKEMONS_DETAILS, {
    variables: { id: pokemonId },
  });

  const pokemon = data?.pokemon?.[0];

  return (
    <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {loading && (
          <div className={classes.loadingContainer}>
            <CircularProgress />
            <p>Loading Pokémon details...</p>
          </div>
        )}

        {error && (
          <div className={classes.errorContainer}>
            <h2>Error loading Pokémon</h2>
            <p>{error.message}</p>
          </div>
        )}

        {pokemon && (
          <div className={classes.detailsContainer}>
            <div className={classes.header}>
              <div className={classes.imageSection}>
                <img
                  src={pokemon.pokemonsprites?.[0]?.sprites}
                  alt={pokemon.pokemonspecy?.pokemonspeciesnames?.[0]?.name}
                  className={classes.pokemonImage}
                />
              </div>
              <div className={classes.infoSection}>
                <h1 className={classes.pokemonName}>
                  {pokemon.pokemonspecy?.pokemonspeciesnames?.[0]?.name
                    .charAt(0)
                    .toUpperCase() +
                    pokemon.pokemonspecy?.pokemonspeciesnames?.[0]?.name.slice(1)}
                </h1>
                <p className={classes.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</p>
                <div className={classes.typeContainer}>
                  {pokemon.pokemontypes?.map((typeObj: any, i: number) => (
                    <span key={i} className={classes.typeBadge}>
                      {typeObj.type.typenames?.[0]?.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={classes.statsGrid}>
              <div className={classes.statBox}>
                <h3>Height</h3>
                <p>{(pokemon.height / 10).toFixed(1)} m</p>
              </div>
              <div className={classes.statBox}>
                <h3>Weight</h3>
                <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
              </div>
              {pokemon.pokemonspecy?.capture_rate && (
                <div className={classes.statBox}>
                  <h3>Capture Rate</h3>
                  <p>{pokemon.pokemonspecy.capture_rate}</p>
                </div>
              )}
            </div>

            <div className={classes.baseStats}>
              <h2>Base Stats</h2>
              {pokemon.pokemonstats?.map((statObj: any, i: number) => (
                <div key={i} className={classes.statRow}>
                  <span className={classes.statName}>
                    {statObj.stat.name.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={classes.statValue}>{statObj.base_stat}</span>
                  <div className={classes.statBar}>
                    <div
                      className={classes.statBarFill}
                      style={{ width: `${(statObj.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const useStyles = tss.create(({ dexTheme }) => ({
  dialogTitle: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: dexTheme.spacing.sm,
  },
  closeButton: {
    color: dexTheme.color.text.primary,
  },
  dialogContent: {
    backgroundColor: dexTheme.color.surface,
    color: dexTheme.color.text.primary,
    padding: dexTheme.spacing.lg,
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    gap: dexTheme.spacing.sm,
    backgroundColor: dexTheme.color.primary,
    color: dexTheme.color.text.primary,
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '300px',
    textAlign: 'center',
    color: '#f44336',
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: dexTheme.spacing.lg,
  },
  header: {
    display: 'flex',
    gap: dexTheme.spacing.lg,
    alignItems: 'center',
  },
  imageSection: {
    flex: '0 0 auto',
  },
  pokemonImage: {
    width: '200px',
    height: '200px',
    objectFit: 'contain',
  },
  infoSection: {
    flex: 1,
  },
  pokemonName: {
    fontSize: '2.5rem',
    margin: 0,
    marginBottom: dexTheme.spacing.xs,
  },
  pokemonId: {
    fontSize: '1.5rem',
    color: dexTheme.color.text.secondary,
    margin: `${dexTheme.spacing.xs} 0`,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: dexTheme.spacing.md,
  },
  statBox: {
    backgroundColor: dexTheme.color.text.secondary + '20',
    padding: dexTheme.spacing.md,
    borderRadius: '8px',
    textAlign: 'center',
    '& h3': {
      margin: 0,
      marginBottom: dexTheme.spacing.xs,
      fontSize: dexTheme.font.sizes.small,
      textTransform: 'uppercase',
      color: dexTheme.color.text.secondary,
    },
    '& p': {
      margin: 0,
      fontSize: dexTheme.font.sizes.large,
      fontWeight: dexTheme.font.weight.bold,
    },
  },
  baseStats: {
    '& h2': {
      marginBottom: dexTheme.spacing.md,
    },
  },
  statRow: {
    display: 'grid',
    gridTemplateColumns: '150px 50px 1fr',
    alignItems: 'center',
    gap: dexTheme.spacing.md,
    marginBottom: dexTheme.spacing.md,
  },
  statName: {
    fontSize: dexTheme.font.sizes.small,
    fontWeight: dexTheme.font.weight.medium,
  },
  statValue: {
    fontSize: dexTheme.font.sizes.base,
    fontWeight: dexTheme.font.weight.bold,
    textAlign: 'right',
  },
  statBar: {
    height: '8px',
    backgroundColor: dexTheme.color.text.secondary + '30',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: dexTheme.color.primary,
    transition: 'width 0.3s ease',
  },  
typeContainer: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1rem',
  },
  typeBadge: {
    backgroundColor: dexTheme.color.primary,
    color: dexTheme.color.surface,
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
}));

export default PokeModal;