import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useUser() {
  const { data, error } = useSWR('/api/users/currentUser');
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);
  return { user: data?.currentUserProfile, isLoading: !data && !error };
}
