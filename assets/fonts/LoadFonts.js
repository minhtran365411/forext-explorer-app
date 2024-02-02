//for fonts
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useCallback } from 'react';

export default function LoadFonts() {
    const [fontsLoaded] = useFonts({
        'TomeOfTheUnknown': require('../../assets/fonts/Tomeoftheunknown-3gL3.ttf'),
        'Eglantine': require('../../assets/fonts/Eglantine-Vy9x.ttf'),
        'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
        // 'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
        // 'Nunito-Light': require('../../assets/fonts/Nunito-Light.ttf'),
        // 'Nunito-SemiBold': require('../../assets/fonts/Nunito-SemiBold.ttf'),
      });

      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          
        }
      }, [fontsLoaded]);
      
      if (!fontsLoaded) {
        return <AppLoading />;
      }
}

