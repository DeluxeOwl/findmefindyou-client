import useSWR, { useSWRConfig } from "swr";
import env from "../env";
import { credStore } from "../stores/credStore";
const fetcher = (url, uniqueKey) =>
  fetch(url, {
    headers: {
      "X-Key": uniqueKey,
    },
  }).then((res) => res.json());

const pendingFriendsEndpoint = `${env.BACKEND_URL}/pending_friends`;

export default function useFriends() {
  const { mutate } = useSWRConfig();
  const uniqueKey = credStore((s) => s.uniqueKey);
  const { data, error } = useSWR([pendingFriendsEndpoint, uniqueKey], fetcher);

  return {
    pendingFriends: data,
    isLoading: !error && !data,
    refetchPendingFriends: () => mutate([pendingFriendsEndpoint, uniqueKey]),
  };
}
