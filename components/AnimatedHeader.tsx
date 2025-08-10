import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { Colors, Radii } from '../constants/Theme';

export function useCollapsibleHeader() {
  const y = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      y.value = e.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const h = interpolate(y.value, [0, 140], [180, 88], Extrapolate.CLAMP);
    return { height: h };
  });

  const titleStyle = useAnimatedStyle(() => {
    const scale = interpolate(y.value, [0, 140], [1, 0.88], Extrapolate.CLAMP);
    const translateY = interpolate(y.value, [0, 140], [0, -10], Extrapolate.CLAMP);
    return { transform: [{ scale }, { translateY }] };
  });

  return { y, onScroll, headerStyle, titleStyle };
}

export function CollapsibleHeader({ title }: { title: string }) {
  return (
    <Animated.View style={[styles.header]}>
      <LinearGradient
        colors={[Colors.gradA, Colors.gradB]}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <Animated.Text style={[styles.title]}>{title}</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 180,
    justifyContent: 'flex-end',
    paddingBottom: 18,
    paddingHorizontal: 18,
    borderBottomLeftRadius: Radii.xl,
    borderBottomRightRadius: Radii.xl,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.text,
  },
});
