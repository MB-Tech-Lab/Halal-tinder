import { LookingFor, User } from "@/src/types/domain";

function matchesLookingFor(viewerGender: "male" | "female" | "other", target: LookingFor) {
  if (target === "everyone") return true;
  if (viewerGender === "other") return true;
  return target === viewerGender;
}

export function getVisibleUsers(users: User[], viewerGender: "male" | "female" | "other") {
  const opposite = viewerGender === "male" ? "female" : viewerGender === "female" ? "male" : "other";

  return users.filter((user) => {
    const genderMatch = viewerGender === "other" ? true : user.gender === opposite;
    return genderMatch && matchesLookingFor(viewerGender, user.lookingFor);
  });
}

export function searchUsers(users: User[], query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return users;

  return users.filter((user) => {
    return [
      user.name,
      user.location,
      user.profession,
      user.bio,
      ...user.interests,
    ].some((value) => value.toLowerCase().includes(normalized));
  });
}
