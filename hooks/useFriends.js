import useSWR, { useSWRConfig } from "swr";
import env from "../env";
import { credStore } from "../stores/credStore";
const fetcher = (url, uniqueKey) =>
  fetch(url, {
    headers: {
      "X-Key": uniqueKey,
    },
  }).then((res) => res.json());

const friendsEndpoint = `${env.BACKEND_URL}/friends`;

export default function useFriends() {
  const { mutate } = useSWRConfig();
  const uniqueKey = credStore((s) => s.uniqueKey);
  const { data, error } = useSWR([friendsEndpoint, uniqueKey], fetcher);

  return {
    friends: data,
    isLoading: !error && !data,
    refetchFriends: () => mutate([friendsEndpoint, uniqueKey]),
  };
}
