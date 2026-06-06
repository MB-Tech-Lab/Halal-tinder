import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/src/components/ui/Button";
import { Screen } from "@/src/components/common/Screen";
import { SectionCard } from "@/src/components/common/SectionCard";
import { ProfileSectionEditor, ProfileSectionKey } from "@/src/features/profile/ProfileSectionEditor";
import { ProfileState, useProfileStore } from "@/src/store/profile.store";
import { useTheme } from "@/src/hooks/useTheme";
import { ProfileFormValues } from "@/src/schemas/profile.schema";

const sections: { title: string; key: ProfileSectionKey }[] = [
  { title: "Bio", key: "bio" },
  { title: "Education", key: "education" },
  { title: "Profession", key: "profession" },
  { title: "Business", key: "business" },
  { title: "Location", key: "location" },
  { title: "Gender", key: "gender" },
  { title: "Looking For", key: "lookingFor" },
  { title: "Interests", key: "interests" },
  { title: "Languages", key: "languages" },
  { title: "Social Links", key: "socialLinks" },
  { title: "Photos", key: "photos" },
];

function toValues(profile: ProfileState): ProfileFormValues {
  return {
    fullName: profile.fullName,
    age: Number(profile.age),
    bio: profile.bio,
    education: profile.education,
    profession: profile.profession,
    business: profile.business,
    location: profile.location,
    gender: profile.gender,
    lookingFor: profile.lookingFor,
    interests: profile.interests,
    languages: profile.languages,
    instagram: profile.socialLinks.instagram ?? "",
    linkedin: profile.socialLinks.linkedin ?? "",
    website: profile.socialLinks.website ?? "",
  };
}

export default function CompleteProfileScreen() {
  const router = useRouter();
  const theme = useTheme();
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const setCompleted = useProfileStore((state) => state.setCompleted);
  const [activeSection, setActiveSection] = useState<ProfileSectionKey | null>(null);

  const values = toValues(profile);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingBottom: 140 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ color: theme.text, fontSize: 28, fontWeight: "800" }}>Complete your profile</Text>
          <Text style={{ color: theme.mutedText }}>
            Fill out each section in a focused drawer. This keeps the onboarding clean while staying quick to finish.
          </Text>
        </View>

        {sections.map((section) => (
          <SectionCard key={section.key} title={section.title} subtitle="Tap to edit" onPress={() => setActiveSection(section.key)} />
        ))}

        <Button
          title="Finish Setup"
          onPress={() => {
    setCompleted(true);
    router.replace("/home");
          }}
        />
      </ScrollView>

      {activeSection ? (
        <ProfileSectionEditor
          visible={true}
          section={activeSection}
          values={values}
          onClose={() => setActiveSection(null)}
          onSave={(next) => {
            updateProfile({
              fullName: next.fullName,
              age: String(next.age),
              bio: next.bio,
              education: next.education,
              profession: next.profession,
              business: next.business ?? "",
              location: next.location,
              gender: next.gender,
              lookingFor: next.lookingFor,
              interests: next.interests,
              languages: next.languages,
              socialLinks: {
                instagram: next.instagram,
                linkedin: next.linkedin,
                website: next.website,
              },
            });
          }}
        />
      ) : null}
    </Screen>
  );
}
