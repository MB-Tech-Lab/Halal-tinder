import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { loginSchema, LoginFormValues } from "@/src/schemas/auth.schema";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Screen } from "@/src/components/common/Screen";
import { useAuthStore } from "@/src/store/auth.store";
import { useProfileStore } from "@/src/store/profile.store";
import { useTheme } from "@/src/hooks/useTheme";

export default function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  const login = useAuthStore((state) => state.login);
  const completed = useProfileStore((state) => state.profile.completed);
  const [showForgot, setShowForgot] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = handleSubmit((values) => {
    login({ id: "me", name: "Alex Mercer", email: values.email }, values.rememberMe ?? true);
    router.replace(completed ? "/home" : "/(profile)/complete-profile");
  });

  return (
    <Screen>
      <View style={{ gap: 18 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ color: theme.text, fontSize: 34, fontWeight: "900" }}>Welcome back</Text>
          <Text style={{ color: theme.mutedText, lineHeight: 22 }}>
            Sign in to continue your matches, chats, and requests.
          </Text>
        </View>

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
              placeholder="Enter your password"
              secureTextEntry
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="rememberMe"
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
              <Text style={{ color: theme.text }}>Remember me</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => setShowForgot(true)}>
            <Text style={{ color: theme.primary, fontWeight: "700" }}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={{ color: theme.primary, fontWeight: "700" }}>Create account</Text>
          </TouchableOpacity>
        </View>

        <Button title="Login" onPress={onSubmit} loading={isSubmitting} />
        <Button
          title="Continue with Google"
          variant="secondary"
          icon={<AntDesign name="google" size={18} color={theme.text} />}
          onPress={() => Alert.alert("Google login", "This is a mocked Google sign-in flow.")}
        />

        {showForgot ? (
          <View
            style={{
              padding: 16,
              borderRadius: 20,
              backgroundColor: theme.surface,
              borderWidth: 1,
              borderColor: theme.border,
              gap: 8,
            }}
          >
            <Text style={{ color: theme.text, fontWeight: "700" }}>Forgot password</Text>
            <Text style={{ color: theme.mutedText }}>Password reset is mocked. We would send a recovery email here.</Text>
          </View>
        ) : null}
      </View>
    </Screen>
  );
}
