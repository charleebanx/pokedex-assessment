import React from 'react';
import { tss } from '../tss';
/*
  PokeListItem focuses on:
    - structuring the data that will be fetched in PokeGrid
 */
type ListProps = {
  id: number;
  name: string;
  types?: string[];
  sprite?: string;
  height?: number;
  weight?: number;
  stats?: string[];
};

const PokeListItem = (props: ListProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.listItem}>
      <div className={classes.idBadge}>#{props.id.toString().padStart(3, '0')}</div>
      <div className={classes.imageContainer}>
        <img
          src={props.sprite}
          alt={props.name}
          className={classes.image}
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image';
          }}
        />
      </div>
      <h3 className={classes.name}>
        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      </h3>
      <div className={classes.typeContainer}>
        {props.types?.map((t, i) => (
          <span key={i} className={classes.typeBadge}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
// PokeListItem Styling
const useStyles = tss.create(({ dexTheme }) => ({
  listItem: {
    backgroundColor: dexTheme.color.cardBackground,
    color: dexTheme.color.text.primary,
    width: '248px',
    height: '250px',
    borderRadius: dexTheme.borderRadius,
    border: `10px solid ${dexTheme.color.surface}`,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: dexTheme.font.family,
    fontSize: dexTheme.font.sizes.base,
    fontWeight: dexTheme.font.weight.regular,
    lineHeight: 'normal',
    padding: dexTheme.spacing.md,
    position: 'relative',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 8px 16px rgba(0,0,0,0.2)`,
      borderColor: dexTheme.color.primary,
    },
  },
  idBadge: {
    position: 'absolute',
    top: dexTheme.spacing.sm,
    right: dexTheme.spacing.sm,
    backgroundColor: dexTheme.color.text.secondary,
    color: dexTheme.color.primary,
    padding: `${dexTheme.spacing.xs} ${dexTheme.spacing.sm}`,
    borderRadius: '8px',
    fontSize: dexTheme.font.sizes.small,
    fontWeight: dexTheme.font.weight.bold,
  },
  imageContainer: {
    width: '150px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: dexTheme.spacing.sm,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  name: {
    margin: `${dexTheme.spacing.xs} 0`,
    fontSize: dexTheme.font.sizes.base,
    fontWeight: dexTheme.font.weight.regular,
    textAlign: 'center',
  },
  typeContainer: {
    display: 'flex',
    gap: dexTheme.spacing.xs,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: dexTheme.spacing.xs,
  },
  typeBadge: {
    backgroundColor: dexTheme.color.primary,
    color: dexTheme.color.surface,
    padding: `${dexTheme.spacing.xs} ${dexTheme.spacing.sm}`,
    borderRadius: '16px',
    fontSize: dexTheme.font.sizes.small,
    fontWeight: dexTheme.font.weight.medium,
    textTransform: 'capitalize',
  },
}));

export default PokeListItem;