import { useEffect } from 'react';
import useBackgroundColor from './useBackgroundColor';
import Vibrant from 'node-vibrant';

const PREFERRED_SWATCHES = [
  'Vibrant',
  'LightVibrant',
  'DarkVibrant',
  'Muted',
  'LightMuted',
  'DarkMuted',
];

const useSetBackgroundColorFromImage = (src: string | null | undefined) => {
  const [, setBackgroundColor] = useBackgroundColor();

  useEffect(() => {
    if (!src) {
      return;
    }

    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      const result = await Vibrant.from(img).getPalette();

      const name = PREFERRED_SWATCHES.find((name) => result[name]);

      if (name) {
        const swatch = result[name]!;

        setBackgroundColor(swatch.hex);
      }
    };
    img.src = src;

    return () => {
      img.onload = null;
    };
  }, [src, setBackgroundColor]);
};

export default useSetBackgroundColorFromImage;