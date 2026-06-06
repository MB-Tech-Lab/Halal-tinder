import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { Screen } from "@/src/components/common/Screen";
import { SectionCard } from "@/src/components/common/SectionCard";
import { Badge } from "@/src/components/common/Badge";
import { Button } from "@/src/components/ui/Button";
import { ProfileSectionEditor, ProfileSectionKey } from "@/src/features/profile/ProfileSectionEditor";
import { ProfileState, useProfileStore } from "@/src/store/profile.store";
import { useTheme } from "@/src/hooks/useTheme";
import { ProfileFormValues } from "@/src/schemas/profile.schema";

const sectionToKey: { title: string; section: ProfileSectionKey }[] = [
  { title: "Personal Information", section: "location" },
  { title: "Bio", section: "bio" },
  { title: "Education", section: "education" },
  { title: "Profession", section: "profession" },
  { title: "Business", section: "business" },
  { title: "Photos", section: "photos" },
  { title: "Interests", section: "interests" },
  { title: "Preferences", section: "lookingFor" },
];

function toFormValues(profile: ProfileState): ProfileFormValues {
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

export default function ProfileScreen() {
  const theme = useTheme();
  const profile = useProfileStore((state) => state.profile);
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const [activeSection, setActiveSection] = useState<ProfileSectionKey | null>(null);

  const formValues = useMemo(() => toFormValues(profile), [profile]);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingBottom: 140 }}>
        <View
          style={{
            borderRadius: 28,
            overflow: "hidden",
            backgroundColor: theme.cardBackground,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Image
            source={{ uri: profile.photos[0] || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&q=80" }}
            style={{ height: 260, width: "100%" }}
            contentFit="cover"
          />
          <View style={{ padding: 16, gap: 10 }}>
            <Text style={{ color: theme.text, fontSize: 24, fontWeight: "800" }}>
              {profile.fullName}, {profile.age}
            </Text>
            <Text style={{ color: theme.mutedText }}>
              {profile.profession} · {profile.location}
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              <Badge label={profile.gender} tone="primary" />
              <Badge label={profile.lookingFor} />
              {profile.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} label={interest} />
              ))}
            </View>
            <Button title="Complete/Update Profile" onPress={() => setActiveSection("bio")} />
          </View>
        </View>

        {sectionToKey.map((item) => (
          <SectionCard
            key={item.title}
            title={item.title}
            subtitle="Open to edit this section"
            onPress={() => setActiveSection(item.section)}
          />
        ))}
      </ScrollView>

      {activeSection ? (
        <ProfileSectionEditor
          visible={true}
          section={activeSection}
          values={formValues}
          onClose={() => setActiveSection(null)}
          onSave={(values) => {
            updateProfile({
              fullName: values.fullName,
              age: String(values.age),
              bio: values.bio,
              education: values.education,
              profession: values.profession,
              business: values.business ?? "",
              location: values.location,
              gender: values.gender,
              lookingFor: values.lookingFor,
              interests: values.interests,
              languages: values.languages,
              socialLinks: {
                instagram: values.instagram,
                linkedin: values.linkedin,
                website: values.website,
              },
            });
          }}
        />
      ) : null}
    </Screen>
  );
}
