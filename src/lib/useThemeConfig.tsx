import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import { Colors } from "@/lib/constants";
import { useColorScheme } from './hooks';


const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    background: Colors.dark.background,
    text: Colors.dark.text,
    border: Colors.dark.tint,
    card: Colors.dark.background,
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.light.background,
    text: Colors.light.text,
    border: Colors.light.tint,
    card: Colors.light.background,
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'Inter',
      fontWeight: '400',

    },
  },
};

export function useThemeConfig() {
  const colorScheme = useColorScheme();

  if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}
