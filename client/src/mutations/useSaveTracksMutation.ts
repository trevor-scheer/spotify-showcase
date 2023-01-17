import { gql, useMutation } from '@apollo/client';
import {
  SaveTracksMutation,
  SaveTracksMutationVariables,
  SaveTracksInput,
} from '../types/api';
import { useCallback } from 'react';

const SAVE_TRACKS_MUTATION = gql`
  mutation SaveTracksMutation($input: SaveTracksInput!) {
    saveTracks(input: $input) {
      savedTracks {
        id
      }
    }
  }
`;

const useSaveTracksMutation = () => {
  const [execute, result] = useMutation<
    SaveTracksMutation,
    SaveTracksMutationVariables
  >(SAVE_TRACKS_MUTATION);

  const saveTracks = useCallback(
    (input: SaveTracksInput) => {
      return execute({
        variables: { input },
        optimisticResponse: {
          saveTracks: {
            __typename: 'SaveTracksPayload',
            savedTracks: input.ids.map((id) => ({ __typename: 'Track', id })),
          },
        },
        update: (cache, result) => {
          console.log(result);
        },
      });
    },
    [execute]
  );

  return [saveTracks, result] as const;
};

export default useSaveTracksMutation;