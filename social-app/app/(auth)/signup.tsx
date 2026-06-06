import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { signupSchema, SignupFormValues } from "@/src/schemas/auth.schema";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Screen } from "@/src/components/common/Screen";
import { useAuthStore } from "@/src/store/auth.store";
import { useTheme } from "@/src/hooks/useTheme";

export default function SignupScreen() {
  const router = useRouter();
  const theme = useTheme();
  const login = useAuthStore((state) => state.login);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: true,
    },
  });

  const onSubmit = handleSubmit((values) => {
    login({ id: "me", name: values.fullName, email: values.email }, true);
    setSuccess(true);
  });

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => router.replace("/(profile)/complete-profile"), 650);
    return () => clearTimeout(timer);
  }, [router, success]);

  if (success) {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 14 }}>
          <View
            style={{
              width: 92,
              height: 92,
              borderRadius: 28,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.primary,
            }}
          >
            <Ionicons name="checkmark" size={42} color={theme.primaryButtonText} />
          </View>
          <Text style={{ color: theme.text, fontSize: 26, fontWeight: "900" }}>Account created</Text>
          <Text style={{ color: theme.mutedText, textAlign: "center" }}>
            We are taking you to profile onboarding so you can finish setup.
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={{ gap: 18 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ color: theme.text, fontSize: 34, fontWeight: "900" }}>Create account</Text>
          <Text style={{ color: theme.mutedText }}>Join the mock social experience and complete your profile in a few focused steps.</Text>
        </View>

        <Controller
          control={control}
          name="fullName"
          render={({ field: { value, onChange } }) => (
            <Input label="Full Name" value={value} onChangeText={onChange} placeholder="Your name" error={errors.fullName?.message} />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <Input label="Email" value={value} onChangeText={onChange} placeholder="you@example.com" error={errors.email?.message} />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Password"
              value={value}
              onChangeText={onChange}
              placeholder="At least 8 characters"
              secureTextEntry
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Confirm Password"
              value={value}
              onChangeText={onChange}
              placeholder="Repeat password"
              secureTextEntry
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="termsAccepted"
          render={({ field: { value, onChange } }) => (
            <TouchableOpacity
              onPress={() => onChange(!value)}
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: value ? theme.primary : theme.inputBorder,
                  backgroundColor: value ? theme.primary : "transparent",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {value ? <Ionicons name="checkmark" size={14} color={theme.primaryButtonText} /> : null}
              </View>
              <Text style={{ color: theme.text }}>I accept the terms and privacy policy</Text>
            </TouchableOpacity>
          )}
        />
        {!!errors.termsAccepted ? <Text style={{ color: theme.error }}>{errors.termsAccepted.message}</Text> : null}

        <Button title="Create account" onPress={onSubmit} loading={isSubmitting} />
        <Button
          title="Continue with Google"
          variant="secondary"
          icon={<AntDesign name="google" size={18} color={theme.text} />}
          onPress={() => Alert.alert("Google signup", "This is a mocked Google sign-up flow.")}
        />

        <TouchableOpacity onPress={() => router.push("/(auth)/login")} style={{ alignSelf: "center" }}>
          <Text style={{ color: theme.primary, fontWeight: "700" }}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
