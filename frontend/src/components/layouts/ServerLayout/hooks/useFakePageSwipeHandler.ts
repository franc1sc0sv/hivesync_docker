import { useSwipeable} from 'react-swipeable';

interface SwipeProps {
    onSwipedLeft?: () => void;
    onSwipedRight?: () => void;
}

export const useSwipeHandler = (config: SwipeProps) => {
  return useSwipeable({
    ...config,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
};
