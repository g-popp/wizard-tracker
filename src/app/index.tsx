import { Text, View } from "react-native";
import { translate } from "@/lib";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{translate('home.welcome')}</Text>
    </View>
  );
}
