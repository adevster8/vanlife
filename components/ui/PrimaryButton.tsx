import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors, Radii, Shadow } from '../../constants/Theme';

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export default function PrimaryButton({ title, onPress, style, disabled }: Props) {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.base,
        Shadow.soft,
        style,
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
        disabled && { opacity: 0.5 },
      ]}
    >
      <LinearGradient
        colors={[Colors.gradA, Colors.gradB, Colors.gradC]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 0.8 }}
        style={styles.gradient}
      >
        <Text style={styles.label}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radii.pill,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: Radii.pill,
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
});
