import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { SignupSchema, signupSchema } from "@/validations/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/hooks/useTheme";

export default function SignupScreen() {
    const theme = useTheme();
    const {
        control,
        handleSubmit,
        formState:{errors}
       } =
       useForm<SignupSchema>({
        resolver:zodResolver(
          signupSchema
        ),
       });  

  const onSubmit = () => {
    router.push("/(profile)/complete-profile");
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
          marginBottom: 20,
          color: theme.text,
        }}
      >
        Create Account
      </Text>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
            <Input
            label="Name"
            value={field.value}
            onChangeText={field.onChange}
            error={errors.name?.message}
           />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            label="Email"
            value={field.value}
            onChangeText={field.onChange}
            error={
             errors.email
              ?.message
            }
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
             errors.password
              ?.message
            }
           />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
            <Input
            label="Confirm Password"
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry
            error={
             errors.confirmPassword
              ?.message
            }
           />
        )}
      />

      <Button
        title="Create Account"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}