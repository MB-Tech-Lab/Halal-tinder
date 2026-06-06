import {
    View,
    Text,
    TouchableOpacity,
  } from "react-native";
  
  import { Ionicons } from "@expo/vector-icons";
  
  interface Props {
    title: string;
    expanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }
  
  export default function ProfileSection({
    title,
    expanded,
    onToggle,
    children,
  }: Props) {
    return (
      <View
        style={{
          marginBottom: 16,
          borderRadius: 16,
          backgroundColor: "#FFF",
          overflow: "hidden",
        }}
      >
        <TouchableOpacity
          onPress={onToggle}
          style={{
            flexDirection: "row",
            justifyContent:
              "space-between",
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {title}
          </Text>
  
          <Ionicons
            name={
              expanded
                ? "chevron-up"
                : "chevron-down"
            }
            size={20}
          />
        </TouchableOpacity>
  
        {expanded && (
          <View
            style={{
              padding: 16,
            }}
          >
            {children}
          </View>
        )}
      </View>
    );
  }