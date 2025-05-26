import React from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { I18nManager, StyleSheet, Text as NNText } from 'react-native';

import { Colors, translate, useThemeColor, type TxKeyPath } from '@/lib';
import { useThemeConfig } from '@/lib/useThemeConfig';

interface Props extends TextProps {
  tx?: TxKeyPath;
}

export const Text = ({
  style,
  tx,
  children,
  ...props
}: Props) => {
  const theme = useThemeConfig();
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
  const fontSize = theme.fonts.regular

  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        {
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
          color: textColor,
          fontSize: fontSize,
        },
        style,
      ]) as TextStyle,
    [style, textColor, fontSize]
  );
  return (
    <NNText style={nStyle} {...props}>
      {tx ? translate(tx) : children}
    </NNText>
  );
};
