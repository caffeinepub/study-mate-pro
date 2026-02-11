import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export interface FileMetadata {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  uploadedAt: bigint;
}

export function useListUserFiles() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const principalString = identity?.getPrincipal().toString() || 'anonymous';

  return useQuery<FileMetadata[]>({
    queryKey: ['userFiles', principalString],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      
      // TODO: Backend needs to implement listCallerFiles method
      // For now, return empty array until backend is updated
      // Expected backend signature: listCallerFiles(): Promise<FileMetadata[]>
      
      return [];
    },
    enabled: !!actor && !actorFetching && !!identity && !identity.getPrincipal().isAnonymous(),
    retry: false,
  });
}

export function useUploadFile() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      if (!actor) throw new Error('Actor not available');
      if (!identity || identity.getPrincipal().isAnonymous()) {
        throw new Error('You must be signed in to upload files');
      }

      // TODO: Backend needs to implement uploadFile method
      // Expected backend signature: 
      // uploadFile(file: { filename: string; contentType: string; data: number[] }): Promise<FileMetadata>
      
      // For now, simulate upload to prevent errors
      // This will be replaced once backend implements the method
      throw new Error('File upload is not yet implemented in the backend. Please contact the administrator.');
    },
    onSuccess: () => {
      // Invalidate and refetch user files list
      const principalString = identity?.getPrincipal().toString() || 'anonymous';
      queryClient.invalidateQueries({ queryKey: ['userFiles', principalString] });
    },
  });
}
