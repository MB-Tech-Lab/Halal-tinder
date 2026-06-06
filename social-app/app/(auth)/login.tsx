import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { LoginSchema, loginSchema } from "@/validations/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/hooks/useTheme";

export default function LoginScreen() {
    const theme = useTheme();
    const {
        control,
        handleSubmit,
        formState:{errors}
       } = useForm<LoginSchema>({
        resolver:zodResolver(
          loginSchema
        ),
       });

  const onSubmit = () => {
    router.replace("/(profile)/complete-profile");
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "700",
          marginBottom: 30,
          color: theme.text,
        }}
      >
        Login
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
            <Input
            label="Email"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.email?.message}
           />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
            <Input
            label="Password"
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry
            error={
             errors.password?.message
            }
           />
        )}
      />

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}