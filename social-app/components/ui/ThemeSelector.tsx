import {
    View,
    Button,
   } from "react-native";
   
   import {
    useThemeStore,
   } from "../../store/themeStore";
   
   export default function ThemeSelector() {
    const setTheme =
     useThemeStore(
      (state) =>
       state.setTheme
     );
   
    return (
     <View>
      <Button
       title="Blue"
       onPress={() =>
         setTheme("blue")
       }
      />
   
      <Button
       title="Orange"
       onPress={() =>
         setTheme("orange")
       }
      />
   
      <Button
       title="WhatsApp"
       onPress={() =>
         setTheme(
          "whatsapp"
         )
       }
      />
     </View>
    );
   }