import { View } from "react-native";
import { Text } from "@/components/ui";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text tx="home.welcome" />
    </View>
  );
}
