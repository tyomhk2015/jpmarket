import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

interface ProfileResponse {
  ok: boolean;
  currentUserProfile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>('/api/users/currentUser');
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter');
    }
  }, [data, router]);
  return { user: data?.currentUserProfile, isLoading: !data && !error };
}
