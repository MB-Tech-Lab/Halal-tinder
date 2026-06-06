import { ScrollView, Text, View } from "react-native";
import { SlideDrawer } from "./SlideDrawer";
import { useTheme } from "@/src/hooks/useTheme";
import { useEffect } from "react";
import { useNotificationStore } from "@/src/store/notification.store";
import { Button } from "@/src/components/ui/Button";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ visible, onClose }: Props) {
  const theme = useTheme();
  const notifications = useNotificationStore((state) => state.notifications);
  const markAllRead = useNotificationStore((state) => state.markAllRead);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const deleteNotification = useNotificationStore((state) => state.deleteNotification);
  const deleteAll = useNotificationStore((state) => state.deleteAll);

  useEffect(() => {
    if (visible) {
      markAllRead();
    }
  }, [visible, markAllRead]);

  return (
    <SlideDrawer visible={visible} onClose={onClose} title="Notifications">
      <View style={{ flex: 1, gap: 12 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingBottom: 24 }}>
          {notifications.map((item) => (
            <View
              key={item.id}
              style={{
                borderRadius: 18,
                padding: 14,
                backgroundColor: theme.surface,
                borderWidth: 1,
                borderColor: item.unread ? theme.primary : theme.border,
                gap: 10,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12 }}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={{ color: theme.text, fontWeight: "800" }}>{item.title}</Text>
                  <Text style={{ color: theme.mutedText, lineHeight: 20 }}>{item.description}</Text>
                </View>
                <Button title="Delete" variant="ghost" onPress={() => deleteNotification(item.id)} />
              </View>
              <Text style={{ color: theme.mutedText, fontSize: 12 }}>{item.unread ? "Unread" : "Read"}</Text>
              {item.unread ? (
                <Button title="Mark Read" variant="secondary" onPress={() => markAsRead(item.id)} />
              ) : null}
            </View>
          ))}
        </ScrollView>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <Button title="Read All" variant="secondary" onPress={markAllRead} />
          </View>
          <View style={{ flex: 1 }}>
            <Button title="Delete All" onPress={deleteAll} />
          </View>
        </View>
      </View>
    </SlideDrawer>
  );
}
