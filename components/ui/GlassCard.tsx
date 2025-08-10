import { BlurView } from 'expo-blur';
import { StyleSheet, ViewStyle } from 'react-native';
import { Radii, Shadow } from '../../constants/Theme';

export default function GlassCard({
  children,
  style,
  intensity = 40,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
}) {
  return (
    <BlurView intensity={intensity} tint="light" style={[styles.glass, Shadow.soft, style]}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  glass: {
    borderRadius: Radii.lg,
    overflow: 'hidden',
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
});
