import { ReactNode, useEffect, useRef } from "react";
import { Animated, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/src/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function SlideDrawer({ visible, onClose, title, children }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible, progress]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={[styles.backdrop, { backgroundColor: theme.overlay }]} onPress={onClose} />
      <Animated.View
        style={[
          styles.panel,
          {
            backgroundColor: theme.drawerBackground,
            borderColor: theme.border,
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
          },
          {
            transform: [
              {
                translateX: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }),
              },
            ],
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.96, 1],
            }),
          },
        ]}
      >
        <View style={styles.handleRow}>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: "700", flex: 1 }}>{title}</Text>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={22} color={theme.text} />
          </Pressable>
        </View>
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  panel: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 6,
    gap: 16,
    padding: 16,
    borderRadius: 0,
  },
  handleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});
