import { QueryClient, QueryClientProvider } from 'react-query';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 0, // 5 minutes
      cacheTime: 1000 * 60 * 0, // 10 minutes
    },
  },
});

export { QueryClientProvider, queryClient };
