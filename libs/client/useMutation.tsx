import React, { useState } from 'react';

interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutationResult = [(data: any) => void, UseMutationState];

// Custom hook for mutation DB w/ given data from client side.
function useMutation(url: string): UseMutationResult {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>();
  const [error, setError] = useState<undefined | any>();

  async function mutation(data: any) {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.json());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  return [mutation, { loading, data, error }];
}

export default useMutation;
