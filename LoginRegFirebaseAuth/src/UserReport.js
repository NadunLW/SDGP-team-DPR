import React, { useState, useEffect,  } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';



const HomeScreen = ({ navigation }) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}>
      <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:23,color: '#242038'}}>
                User Reports
            </Text>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/report.png')} style={styles.image} />
    </View>
      <TouchableOpacity
          onPress={() => navigation.navigate('Report')}
          style={styles.notButton}
        >
          <Text style={styles.notButtonText}>Line Chart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Exercises')}
          style={styles.notButton}
        >
          <Text style={styles.notButtonText}>Exercise Suggestions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Usage')}
          style={styles.notButton}
        >
          <Text style={styles.notButtonText}>Usage Time</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonBackMain}>
            <Text style={styles.buttonTextMain}>Return</Text>
        </TouchableOpacity>
        
          
      </View>
    </View>
  );
};

const data = {
  labels: ['GOOD', 'BAD', 'AVG', 'POOR'],
  datasets: [
    {
      data: [1,2,5,4],
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundColor: '#8D86C9',
  backgroundGradientFrom: '#8D86C9',
  backgroundGradientTo: '#9067C6',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const screenWidth = Dimensions.get('window').width;

const ReportScreen = () => {
  return (
    
    <View style={{ flex: 1,  alignItems: 'center' , marginTop: 200}}>
        <Text style={{marginBottom: 50 , fontWeight:'bold',fontSize:23,color: '#242038'}}>Line Chart</Text>
      <LineChart 
        data={data}
        width={screenWidth - 30}
        height={450}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero={true}
        showValuesOnTopOfPoints={true}
        
      />
      
    </View>
  );
};


// Exercise Suggestions===========================================
const ExercisesScreen = ({ navigation }) => (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
      
      <ScrollView>
      <View>
        <Text style={styles.text}>Exercise Suggestions</Text>
        
      </View>
        <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:18,color: '#242038', alignSelf:'left'}}>
                1. Yoga poses for you
            </Text>
          <Image source={require('../assets/yogaex.jpg')} style={styles.image} />
          <Text style={{fontWeight:'bold',fontSize:18,color: '#242038', alignSelf:'left'}}>
                2. Back Excercises at the Gym
            </Text>
          <Image source={require('../assets/backex.jpg')} style={styles.image} />
          <Text style={{fontWeight:'bold',fontSize:18,color: '#242038', alignSelf:'left'}}>
                3. Stretches for you
            </Text>
          <Image source={require('../assets/stretchex.jpg')} style={styles.image} />
          <Text style={{fontWeight:'bold',fontSize:18,color: '#242038', alignSelf:'left'}}>
                4. Other excercises
            </Text>
          <Image source={require('../assets/otherex.jpg')} style={styles.image} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
// Usage timer ==============================================================================


import { UsageTime } from '../src/Dashboard';

const UsageScreen = ({ navigation }) => {
  const time = UsageTime();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.imageContainer}>
                <Image source={require('../assets/timer.png')} style={styles.imageTime} />
            </View>
      <Text style={{ fontSize: 30, marginBottom: 20,fontWeight:'bold',fontSize:23,color: '#242038' }}>Usage Time: {formatTime(time)}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonBack}>
            <Text style={styles.buttonText}>Return</Text>
    </TouchableOpacity>
    </View>
  );
};
//};//  ==============================================================================

const Stack = createStackNavigator();

const App = () => (

    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Report" component={ReportScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Exercises" component={ExercisesScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Usage" component={UsageScreen}options={{ headerShown: false }} />
    </Stack.Navigator>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonView: {
    backgroundColor: 'black',
    
  },

  
  notButton: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 400,
    marginBottom: 10,
    
    backgroundColor: '#9067C6',
    borderRadius: 12,
    paddingLeft: 20,
    color: '#242038'
  },
  notButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: 25,
    fontWeight: 'bold',
    
  },
  imageContainer: {
    alignItems: 'center',
},
image: {
    width: 400,
    height: 400,
},
text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf:'center'
  },
  container: {
    flex: 1,
    // flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    margin: 10,
  },
  imageContainer: {
    alignItems: 'center',
},
imageTime: {
    width: 400,
    height: 300,
    margin: 10,
  },
  buttonBack: {
    backgroundColor: "#9067C6",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonTextMain: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  buttonBackMain: {
    backgroundColor: "#FF6584",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },



});

export default App;
