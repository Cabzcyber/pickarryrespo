/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0AB3FF';
const tintColorDark = '#0AB3FF';

export const Colors = {
  light: {
    background: '#F9FAFB', // Off-White/Gray-50
    card: '#FFFFFF',       // Pure White
    surface: '#FFFFFF',    // Pure White
    text: '#111827',       // Gray-900
    subText: '#6B7280',    // Gray-500
    border: '#E5E7EB',     // Gray-200
    tint: tintColorLight,  // Brand Color
    success: '#10B981',    // Emerald-500
    tabBar: '#FFFFFF',     // Pure White
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    background: '#141519', // Dark Mode Background
    card: '#192028',       // Input fields, Dropdowns
    surface: '#363D47',    // BottomSheets, Headers
    text: '#FFFFFF',       // Primary Headings
    subText: '#7398A9',    // Placeholders
    border: '#363D47',     // Dividers
    tint: tintColorDark,   // Brand Color
    success: '#3BF579',    // Success Buttons
    tabBar: '#1f2937',     // Bottom Tab Bar
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
