import { useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/store/authStore";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ProfileSection from "@/components/ui/ProfileSection";

import ProfileImagePicker from "@/components/profile/ProfileImagePicker";
import ThemeSelectorCard from "@/components/profile/ThemeSelectorCard";

import { ProfileSchema } from "@/validations/profile.schema";
import { Ionicons } from "@expo/vector-icons";

export default function CompleteProfile() {
  const theme = useTheme();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const [image, setImage] = useState("");

  const [basicOpen, setBasicOpen] =
    useState(true);

  const [aboutOpen, setAboutOpen] =
    useState(false);

  const [careerOpen, setCareerOpen] =
    useState(false);

  const [
    educationOpen,
    setEducationOpen,
  ] = useState(false);

  const [
    lifestyleOpen,
    setLifestyleOpen,
  ] = useState(false);

  const [
    locationOpen,
    setLocationOpen,
  ] = useState(false);

  const [accountOpen, setAccountOpen] =
    useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(
      ProfileSchema
    ),

    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      height: "",
      maritalStatus: "",
      bio: "",
      occupation: "",
      company: "",
      education: "",
      hobbies: "",
      interests: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const onSubmit = (
    data: ProfileSchema
  ) => {
    console.log({
      ...data,
      image,
    });

    Alert.alert(
      "Success",
      "Profile completed successfully"
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          theme.background,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 60,
      }}
    >

      <Text
        style={{
          color: theme.text,
          marginBottom: 24,
          textAlign: "center",
          fontFamily: "Poppins-Bold",
          fontStyle: "italic",
          fontWeight: "bold",
          fontSize: 28
        }}
      >
        <Ionicons
          name="person-circle"
          size={30}
          color={theme.primary}
          style={{ marginRight: 10 }}
        />
        Complete Profile
      </Text>

      <ProfileImagePicker
        image={image}
        setImage={setImage}
        primary={theme.primary}
      />

      {/* BASIC INFO */}

      <ProfileSection
        title="Basic Information"
        expanded={basicOpen}
        onToggle={() =>
          setBasicOpen(
            !basicOpen
          )
        }
      >
        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <Input
              label="Full Name"
              value={field.value}
              onChangeText={
                field.onChange
              }
              error={
                errors.fullName
                  ?.message
              }
            />
          )}
        />

        <Controller
          control={control}
          name="age"
          render={({ field }) => (
            <Input
              label="Age"
              value={field.value}
              onChangeText={
                field.onChange
              }
              error={
                errors.age?.message
              }
            />
          )}
        />

        <Controller
          control={control}
          name="height"
          render={({ field }) => (
            <Input
              label="Height (cm)"
              value={field.value}
              onChangeText={
                field.onChange
              }
              error={
                errors.height
                  ?.message
              }
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select
              placeholder="Gender"
              value={field.value}
              data={[
                {
                  label: "Male",
                  value: "male",
                },
                {
                  label: "Female",
                  value: "female",
                },
              ]}
              onChange={
                field.onChange
              }
            />
          )}
        />

        <Controller
          control={control}
          name="maritalStatus"
          render={({ field }) => (
            <Select
              placeholder="Marital Status"
              value={field.value}
              data={[
                {
                  label: "Single",
                  value: "single",
                },
                {
                  label: "Divorced",
                  value: "divorced",
                },
                {
                  label: "Widowed",
                  value: "widowed",
                },
              ]}
              onChange={
                field.onChange
              }
            />
          )}
        />
      </ProfileSection>

      {/* ABOUT */}

      <ProfileSection
        title="About Me"
        expanded={aboutOpen}
        onToggle={() =>
          setAboutOpen(
            !aboutOpen
          )
        }
      >
        <Controller
          control={control}
          name="bio"
          render={({ field }) => (
            <Input
              label="About Yourself"
              value={field.value}
              onChangeText={
                field.onChange
              }
              error={
                errors.bio?.message
              }
            />
          )}
        />
      </ProfileSection>

      {/* CAREER */}

      <ProfileSection
        title="Career"
        expanded={careerOpen}
        onToggle={() =>
          setCareerOpen(
            !careerOpen
          )
        }
      >
        <Controller
          control={control}
          name="occupation"
          render={({ field }) => (
            <Input
              label="Occupation"
              value={field.value}
              onChangeText={
                field.onChange
              }
            />
          )}
        />

        <Controller
          control={control}
          name="company"
          render={({ field }) => (
            <Input
              label="Company"
              value={field.value}
              onChangeText={
                field.onChange
              }
            />
          )}
        />
      </ProfileSection>

      {/* EDUCATION */}

      <ProfileSection
        title="Education"
        expanded={
          educationOpen
        }
        onToggle={() =>
          setEducationOpen(
            !educationOpen
          )
        }
      >
        <Controller
          control={control}
          name="education"
          render={({ field }) => (
            <Input
              label="Highest Qualification"
              value={field.value}
              onChangeText={
                field.onChange
              }
            />
          )}
        />
      </ProfileSection>

      {/* LIFESTYLE */}

      <ProfileSection
        title="Lifestyle"
        expanded={
          lifestyleOpen
        }
        onToggle={() =>
          setLifestyleOpen(
            !lifestyleOpen
          )
        }
      >
        <Controller
          control={control}
          name="hobbies"
          render={({ field }) => (
            <Input
              label="Hobbies"
              value={field.value}
              onChangeText={
                field.onChange
              }
            />
          )}
        />

        <Controller
          control={control}
          name="interests"
          render={({ field }) => (
            <Input
              label="Interests"
              value={field.value}
              onChangeText={
                field.onChange
              }
            />
          )}
        />
      </ProfileSection>

      {/* LOCATION */}

      <ProfileSection
        title="Location"
        expanded={
          locationOpen
        }
        onToggle={() =>
          setLocationOpen(
            !locationOpen
          )
        }
      >
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Input
              label="City"
              value={field.value}
              onChangeText={
                field.onChange
              }
            />
          )}
        />

        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <Input
              label="State"
              value={field.value}
              onChangeText={
                field.onChange
              }
            />
          )}
        />

        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <Input
              label="Country"
              value={field.value}
              onChangeText={
                field.onChange
              }
            />
          )}
        />
      </ProfileSection>

      {/* ACCOUNT */}

      <ProfileSection
        title="Account Settings"
        expanded={
          accountOpen
        }
        onToggle={() =>
          setAccountOpen(
            !accountOpen
          )
        }
      >

        <ThemeSelectorCard />

        <Button
          title="Logout"
          onPress={() => {
            logout();

            router.replace(
              "/(auth)/login"
            );
          }}
        />
      </ProfileSection>

      <Button
        title="Complete Profile"
        onPress={handleSubmit(
          onSubmit
        )}
      />
    </ScrollView>
  );
}