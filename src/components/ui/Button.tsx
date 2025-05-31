import { Colors, useThemeColor } from '@/lib';
import React from 'react';
import type { PressableProps, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ActivityIndicator, Pressable, Text, StyleSheet } from 'react-native';

type ButtonVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
type ButtonSize = 'default' | 'lg' | 'sm' | 'icon';

interface Props extends Omit<PressableProps, 'disabled'> {
  label?: string;
  loading?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: ButtonSize;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = React.forwardRef<View, Props>(
  (
    {
      label: text,
      loading = false,
      variant = 'default',
      disabled = false,
      size = 'default',
      fullWidth = true,
      style,
      textStyle,
      testID,
      ...props
    },
    ref
  ) => {
    const backgroundColor = useThemeColor(
      { light: Colors.dark.background, dark: Colors.light.background },
      'background'
    );
    const textColor = useThemeColor(
      { light: Colors.dark.text, dark: Colors.light.text },
      'text'
    );
    const tintColor = useThemeColor(
      { light: Colors.dark.tint, dark: Colors.light.tint },
      'tint'
    );

    const styles = React.useMemo(
      () =>
        StyleSheet.create({
          container: {
            marginVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 6,
            paddingHorizontal: 16,
          },
          label: {
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: '600',
          },
          indicator: {
            height: 24,
          },
          // Variants
          default: {
            backgroundColor,
          },
          defaultLabel: {
            color: textColor,
          },
          secondary: {
            backgroundColor,
          },
          secondaryLabel: {
            color: textColor,
          },
          outline: {
            borderWidth: 1,
            borderColor: tintColor,
          },
          outlineLabel: {
            color: textColor,
          },
          destructive: {
            backgroundColor,
          },
          destructiveLabel: {
            color: textColor,
          },
          ghost: {
            backgroundColor: 'transparent',
          },
          ghostLabel: {
            color: textColor,
            textDecorationLine: 'underline',
          },
          link: {
            backgroundColor: 'transparent',
          },
          linkLabel: {
            color: textColor,
          },
          // Sizes
          defaultSize: {
            height: 40,
            paddingHorizontal: 16,
          },
          lgSize: {
            height: 48,
            paddingHorizontal: 32,
          },
          smSize: {
            height: 32,
            paddingHorizontal: 12,
          },
          iconSize: {
            width: 36,
            height: 36,
          },
          // States
          disabled: {
            backgroundColor: tintColor,
            opacity: 0.5,
          },
          disabledLabel: {
            color: textColor,
            opacity: 0.5,
          },
          fullWidth: {
            width: '100%',
          },
          selfCenter: {
            alignSelf: 'center',
          },
        }),
      [backgroundColor, textColor, tintColor]
    );

    const containerStyle = [
      styles.container,
      styles[`${variant}Size` as keyof typeof styles],
      styles[variant],
      disabled && styles.disabled,
      fullWidth ? styles.fullWidth : styles.selfCenter,
      style,
    ] as StyleProp<ViewStyle>;

    const labelStyle = [
      styles.label,
      styles[`${variant}Label` as keyof typeof styles],
      disabled && styles.disabledLabel,
      textStyle,
    ] as StyleProp<TextStyle>;

    const indicatorStyle = [
      styles.indicator,
      styles[`${variant}Label` as keyof typeof styles],
      disabled && styles.disabledLabel,
    ] as StyleProp<ViewStyle>;

    return (
      <Pressable
        disabled={disabled || loading}
        style={containerStyle}
        {...props}
        ref={ref}
        testID={testID}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            {loading ? (
              <ActivityIndicator
                size="small"
                style={indicatorStyle}
                testID={testID ? `${testID}-activity-indicator` : undefined}
              />
            ) : (
              <Text
                testID={testID ? `${testID}-label` : undefined}
                style={labelStyle}
              >
                {text}
              </Text>
            )}
          </>
        )}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export { Button };
