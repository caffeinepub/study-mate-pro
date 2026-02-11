import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

/**
 * Custom hooks for backend queries using React Query
 * 
 * Add feature-specific hooks here that encapsulate backend operations
 * and manage data invalidation.
 */

export function useExampleQuery() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      if (!actor) return null;
      // Add backend calls here when needed
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}
