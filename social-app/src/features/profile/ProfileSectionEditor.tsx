import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, ScrollView, Text, View } from "react-native";
import { useEffect } from "react";
import { profileSchema, ProfileFormValues } from "@/src/schemas/profile.schema";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { MultiSelect } from "@/src/components/ui/MultiSelect";
import { Select } from "@/src/components/ui/Select";
import { TextArea } from "@/src/components/ui/TextArea";
import { useTheme } from "@/src/hooks/useTheme";
import { ProfileEditDrawer } from "@/src/components/drawers/ProfileEditDrawer";
import { GENDERS, LOOKING_FOR } from "@/src/types/domain";

export type ProfileSectionKey =
  | "bio"
  | "education"
  | "profession"
  | "business"
  | "location"
  | "gender"
  | "lookingFor"
  | "interests"
  | "languages"
  | "socialLinks"
  | "photos";

interface Props {
  visible: boolean;
  section: ProfileSectionKey;
  values: ProfileFormValues;
  onClose: () => void;
  onSave: (values: ProfileFormValues) => void;
}

const interestOptions = [
  "Coffee",
  "Travel",
  "Fitness",
  "Books",
  "Music",
  "Food",
  "Design",
  "Movies",
  "Hiking",
  "Yoga",
  "Startups",
  "Gaming",
  "Photography",
  "Art",
].map((value) => ({ label: value, value }));

const languageOptions = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Bengali"].map((value) => ({
  label: value,
  value,
}));

export function ProfileSectionEditor({ visible, section, values, onClose, onSave }: Props) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as any,
    defaultValues: values,
  });

  useEffect(() => {
    reset(values);
  }, [values, reset, section]);

  const titleMap: Record<ProfileSectionKey, string> = {
    bio: "Edit Bio",
    education: "Edit Education",
    profession: "Edit Profession",
    business: "Edit Business",
    location: "Edit Location",
    gender: "Edit Gender",
    lookingFor: "Edit Preference",
    interests: "Edit Interests",
    languages: "Edit Languages",
    socialLinks: "Edit Social Links",
    photos: "Edit Photos",
  };

  const onSubmit = handleSubmit((data) => {
    onSave(data);
    Alert.alert("Saved", "Profile section updated successfully.");
    onClose();
  });

  return (
    <ProfileEditDrawer visible={visible} onClose={onClose} title={titleMap[section]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>
        {section === "bio" && (
          <Controller
            control={control}
            name="bio"
            render={({ field: { value, onChange } }) => (
              <TextArea label="Bio" value={value} onChangeText={onChange} error={errors.bio?.message} />
            )}
          />
        )}

        {section === "education" && (
          <Controller
            control={control}
            name="education"
            render={({ field: { value, onChange } }) => (
              <Input label="Education" value={value} onChangeText={onChange} error={errors.education?.message} />
            )}
          />
        )}

        {section === "profession" && (
          <Controller
            control={control}
            name="profession"
            render={({ field: { value, onChange } }) => (
              <Input label="Profession" value={value} onChangeText={onChange} error={errors.profession?.message} />
            )}
          />
        )}

        {section === "business" && (
          <Controller
            control={control}
            name="business"
            render={({ field: { value, onChange } }) => (
              <Input label="Business" value={value ?? ""} onChangeText={onChange} error={errors.business?.message} />
            )}
          />
        )}

        {section === "location" && (
          <Controller
            control={control}
            name="location"
            render={({ field: { value, onChange } }) => (
              <Input label="Location" value={value} onChangeText={onChange} error={errors.location?.message} />
            )}
          />
        )}

        {section === "gender" && (
          <Controller
            control={control}
            name="gender"
            render={({ field: { value, onChange } }) => (
              <Select
                label="Gender"
                value={value}
                options={GENDERS.map((gender) => ({ label: gender, value: gender }))}
                onChange={onChange}
                error={errors.gender?.message}
              />
            )}
          />
        )}

        {section === "lookingFor" && (
          <Controller
            control={control}
            name="lookingFor"
            render={({ field: { value, onChange } }) => (
              <Select
                label="Looking For"
                value={value}
                options={LOOKING_FOR.map((item) => ({ label: item, value: item }))}
                onChange={onChange}
                error={errors.lookingFor?.message}
              />
            )}
          />
        )}

        {section === "interests" && (
          <Controller
            control={control}
            name="interests"
            render={({ field: { value, onChange } }) => (
              <MultiSelect
                label="Interests"
                value={value}
                options={interestOptions}
                onChange={onChange}
                error={errors.interests?.message}
              />
            )}
          />
        )}

        {section === "languages" && (
          <Controller
            control={control}
            name="languages"
            render={({ field: { value, onChange } }) => (
              <MultiSelect
                label="Languages"
                value={value}
                options={languageOptions}
                onChange={onChange}
                error={errors.languages?.message}
              />
            )}
          />
        )}

        {section === "socialLinks" && (
          <View style={{ gap: 12 }}>
            <Controller
              control={control}
              name="instagram"
              render={({ field: { value, onChange } }) => (
                <Input label="Instagram" value={value ?? ""} onChangeText={onChange} placeholder="instagram.com/yourhandle" />
              )}
            />
            <Controller
              control={control}
              name="linkedin"
              render={({ field: { value, onChange } }) => (
                <Input label="LinkedIn" value={value ?? ""} onChangeText={onChange} placeholder="linkedin.com/in/you" />
              )}
            />
            <Controller
              control={control}
              name="website"
              render={({ field: { value, onChange } }) => (
                <Input label="Website" value={value ?? ""} onChangeText={onChange} placeholder="https://yourdomain.com" />
              )}
            />
          </View>
        )}

        {section === "photos" && (
          <View style={{ gap: 12 }}>
            <Text style={{ color: theme.text, fontWeight: "700" }}>Photo management is mocked in this build.</Text>
            <Text style={{ color: theme.mutedText }}>
              Hook in an uploader later. For now the profile keeps the mock photo set in Zustand.
            </Text>
          </View>
        )}

        <Button title="Save Changes" onPress={onSubmit} loading={isSubmitting} />
      </ScrollView>
    </ProfileEditDrawer>
  );
}
