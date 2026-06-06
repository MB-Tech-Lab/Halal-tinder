import * as ImagePicker from "expo-image-picker";

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface Props {
  image: string;
  setImage: (uri: string) => void;
  primary: string;
}

export default function ProfileImagePicker({
  image,
  setImage,
  primary,
}: Props) {
  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={pickImage}
        style={[
          styles.avatar,
          {
            borderColor: primary,
          },
        ]}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
        ) : (
          <Ionicons
            name="camera"
            size={40}
            color={primary}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
  },
});