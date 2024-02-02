import React, {useState, useRef} from 'react'
import {Button, Text, View, StyleSheet, FlatList, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import slides from '../../assets/boardingassets/slides';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import NextButton from './NextButton';


export default function LandingScreen ({navigation}) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef();

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const scrollTo = async () => {
    if (currentIndex < (slides.length - 1)) {
        slidesRef.current.scrollToIndex({ index: currentIndex +1 });
    } else {
        try {
          await AsyncStorage.setItem('@viewOnboarding', 'true');
          navigation.navigate('Register');
        } catch (err) {
          console.log('Error @setItem', err)
        }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>

        <FlatList 
          ref={slidesRef}
          data={slides}
          renderItem={({item}) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled //snap to page enabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {x:scrollX}}}], {
            useNativeDriver:false,
          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig.current}
        />
      </View>

      <Paginator data={slides} scrollX={scrollX} />
      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)}  />

        {/* <Button 
            title='Register'
            onPress={() => navigation.navigate('Register')}
        />

        <Button 
            title='Login'
            onPress={() => navigation.navigate('Login')}
        /> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEAD8'
  }
})
