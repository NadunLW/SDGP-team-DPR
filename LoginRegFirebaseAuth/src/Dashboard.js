import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native'

const Dashboard = () => {
  const [name, setName] = useState('')
  const navigation = useNavigation()

  

  // display the name according to the user from firebase firestore database
  useEffect(() => {
    firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        } else {
          console.log("User does not exist")
        }
      })
    // Show the popup message when the Dashboard page opens up
    Alert.alert(
      'Maximise the accuracy ',
      'Hold your phone in a better position to get a clear view and make sure to keep your volume up',
      [{ text: 'OK' }],
      { cancelable: false }
    )
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 40 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Posture</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/right.png')} style={styles.image} />
      </View>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          // onPress={()=> }
          style={styles.notButton}
        >
          <Text style={styles.notButtonText}>Change Camera Angle</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.notButton}
        >
          <Text style={styles.notButtonText}>User Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=> navigation.navigate('UserReport')}
          style={styles.notButton}
        >
          <Text style={styles.notButtonText}>User Report</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          // onPress={()=> }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={()=> registerUser(email,password,firstName,lastName)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Close Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export const UsageTime = () => {
    const [time, setTime] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    return time;
  };

export default Dashboard

// styles for the components
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9067C6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 200,
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#242038',
  },
  notButton: {
    paddingTop: 20,
    paddingBottom: 20,
    width: 400,
    marginBottom: 10,
    textAlign: 'left',
    backgroundColor: '#ECEAF3',
    borderRadius: 12,
    paddingLeft: 20,
  },
  notButtonText: {
    color: '#242038',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})
