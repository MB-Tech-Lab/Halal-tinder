import { Redirect } from "expo-router";
import { useAuthStore } from "@/src/store/auth.store";
import { useProfileStore } from "@/src/store/profile.store";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const completed = useProfileStore((state) => state.profile.completed);

  return (
    <Redirect href={isAuthenticated ? (completed ? "/home" : "/(profile)/complete-profile") : "/(auth)/login"} />
  );
}
