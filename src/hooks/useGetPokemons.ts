import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  height?: number;
  weight?: number;
  stats?: string[];
}

export interface PokemonDetail extends Pokemon {
  // Details
}

export const GET_POKEMONS = gql`
  query GetPokemons($search: String) {
    pokemon(
      limit: 151
      order_by: { id: asc }
      where: {
        pokemonspecy: {
          pokemonspeciesnames: { language: { name: { _eq: "en" } }, name: { _regex: $search } }
        }
      }
    ) {
      id
      pokemonspecy {
        pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }) {
          name
        }
      }
      pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemontypes {
        type {
          typenames(where: { language: { name: { _eq: "en" } } }) {
            name
          }
        }
      }
    }
  }
`;

export const GET_POKEMON_DETAILS = gql`
  query GetPokemonDetails($id: String!) {
    pokemon(where: { id: { _eq: $id } }) {
      id
      pokemonspecy {
        pokemonspeciesnames(where: { language: { name: { _eq: "en" } } }) {
          name
        }
        capture_rate
      }
      pokemonsprites {
        sprites(path: "other.official-artwork.front_default")
      }
      pokemontypes {
        type {
          typenames(where: { language: { name: { _eq: "en" } } }) {
            name
          }
        }
      }
      weight
      height
      pokemonstats {
        base_stat
        stat {
          name
        }
      }
    }
  }
`;

// Search should be done client-side for the mid-level assessment. Uncomment for the senior assessment.
export const useGetPokemons = () => {
  const { data, loading, error } = useQuery<{ pokemon: any[] }>(GET_POKEMONS, {
    variables: {
      search: '',
    },
  });

  const formattedData: Pokemon[] =
    data?.pokemon?.map((p) => ({
      id: p.id,
      name: p.pokemonspecy?.pokemonspeciesnames?.[0]?.name ?? 'Unknown',
      // modified the return to fetch data that will be presented through list item & modal
      sprite: p.pokemonsprites?.[0]?.sprites ?? '',
      weight: p.weight,
      height: p.height,
      stats: p.pokemonstats?.map((s: any) => s.stat.name) ?? [],
      types:
        p.pokemontypes?.map((t: any) => t.type.typenames?.[0]?.name ?? '') ??
        [],
    })) ?? [];

  return {
    data: formattedData,
    loading,
    error: error ?? null,
  };
};

