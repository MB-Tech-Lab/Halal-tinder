import {
    TextInput,
    View,
    Text,
} from "react-native";
import { useTheme } from "@/hooks/useTheme";

interface Props {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: string;
    secureTextEntry?: boolean;
}

export default function Input({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    secureTextEntry,
}: Props) {
    const theme = useTheme();
    return (    
        <View style={{
            marginBottom: 16,
        }}>
            <Text style={{
                marginBottom: 6,
                fontWeight: "600",
            }}>{label}</Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={{
                    borderWidth: 1,
                    borderColor: theme.border,
                    borderRadius: 12,
                    padding: 14,
                }}
            />

            {error && (
                <Text
                    style={{
                        color: theme.error,
                        marginTop: 4
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
}
