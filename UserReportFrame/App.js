import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Animated,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const image = { uri: 'https://mediaproxy.salon.com/width/1200/https://media.salon.com/2013/12/coffee_robot.jpg' };

const Separator = () => <View style={styles.separator} />;

const HomeScreen = ({ navigation }) => {
  const [buttonAnimation, setButtonAnimation] = useState(new Animated.Value(0));

  const startButtonAnimation = () => {
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const buttonScale = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button
            title="User Report"
            onPress={() => navigation.navigate('Report')}
            onPressIn={startButtonAnimation}
          />
        </Animated.View>
        <Separator />
        <View>
          <Button
            title="Exercise Suggestions"
            color="#f194ff"
            onPress={() => navigation.navigate('Exercises')}
          />
        </View>
        <Separator />
        <View>
          <Button
            title="Usage Time"
            color="#8b008b"
            onPress={() => navigation.navigate('Usage')}
          />
        </View>
        <Separator />
        <View style={styles.fixToText}>
          <Button
            title="BACK"
            onPress={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const data = {
  labels: ['GOOD', 'BAD', 'AVG', 'POOR'],
  datasets: [
    {
      data: [216, 245, 281, 336],
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundColor: '#1abc9c',
  backgroundGradientFrom: '#1abc9c',
  backgroundGradientTo: '#1abc9c',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const screenWidth = Dimensions.get('window').width;

const ReportScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LineChart
        data={data}
        width={screenWidth - 30}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfPoints={true}
      />
      <Text>User Report Screen</Text>
    </View>
  );
};



const ExercisesScreen = ({ navigation }) => (
  <View style={[styles.container, { backgroundColor: 'blue' }]}>
    <Text>Exercise Suggestions</Text>
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </View>
);

const UsageScreen = ({ navigation }) => {
  const [time, setTime] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Usage Time: {formatTime(time)}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Exercises" component={ExercisesScreen} />
      <Stack.Screen name="Usage" component={UsageScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
