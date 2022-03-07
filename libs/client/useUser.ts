import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useLayoutEffect(() => {
    fetch("/api/users/currentUser")
      .then((response) => response.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter");
        }
        setUser(data.currentUserProfile);
      });
  }, [router]);
  return user;
}