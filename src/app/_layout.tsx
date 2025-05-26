
import { useThemeConfig } from "@/lib/useThemeConfig";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }} />
    </Providers>
  )
}

function Providers({children}: {children: React.ReactNode}) {
  const theme = useThemeConfig();

  return (
    <ThemeProvider value={theme}>
      {children}
    </ThemeProvider>
  )
}
