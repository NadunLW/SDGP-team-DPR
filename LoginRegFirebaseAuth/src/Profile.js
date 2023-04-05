import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, I18nManager,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';


const UserProfile = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [nameError, setNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data().name);
          setGender(snapshot.data().gender);
          setAge(snapshot.data().age);
          setHeight(snapshot.data().height);
          setWeight(snapshot.data().weight);
        } else {
          console.log('User does not exist');
        }
      });
  }, []);
  

  
  const handleSave = () => {
    let hasError = false;
  
    if (name.trim() === '') {
      setNameError('Please enter a valid name.');
      hasError = true;
    } else if (!/^[a-zA-Z]+$/.test(name.trim())) {
      setNameError('Name can only contain letters.');
      hasError = true;
    } else {
      setNameError('');
    }
  
    if (gender.trim() === '') {
      setGenderError('Please enter a valid gender.');
      hasError = true;
    } else if (!/^[a-zA-Z]+$/.test(gender.trim())) {
      setGenderError('Gender can only contain letters.');
      hasError = true;
    } else {
      setGenderError('');
    }
  
    if (age.trim() === '') {
      setAgeError('Please enter a valid age.');
      hasError = true;
    } else if (!/^\d+$/.test(age.trim())) {
      setAgeError('Age can only contain numbers.');
      hasError = true;
    } else {
      setAgeError('');
    }
  
    if (height.trim() === '') {
      setHeightError('Please enter a valid height.');
      hasError = true;
    } else if (!/^\d+$/.test(height.trim())) {
      setHeightError('Height can only contain numbers.');
      hasError = true;
    } else {
      setHeightError('');
    }
  
    if (weight.trim() === '') {
      setWeightError('Please enter a valid weight.');
      hasError = true;
    } else if (!/^\d+$/.test(weight.trim())) {
      setWeightError('Weight can only contain numbers.');
      hasError = true;
    } else {
      setWeightError('');
    }
  
    if (!hasError) {
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          name: name.trim(),
          gender: gender.trim(),
          age: age.trim(),
          height: height.trim(),
          weight: weight.trim(),
        })
        .then(() => {
          Alert.alert('Profile updated successfully!', '', [{ text: 'OK' }]);
        })
        .catch((error) => {
          Alert.alert('Error updating profile', error.message, [{ text: 'OK' }]);
        });
    }
  };
  

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 40, marginTop: 20 }}>

    <View style={styles.imageContainer}>
        <Image source={require('../assets/profilepic.png')} style={styles.image} />
    </View>
      <Text style={styles.heading}>User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => {setName(text)
        // inline validation
        setNameError('')}}

      />
      {/*  terneray operator to render the text : 
                if nameError is true - display message in red color
                if nameError is fals - display nothing  */}
                {nameError ? <Text style={{ color: '#FF6584' , alignSelf:'flex-end',paddingRight:20}}>{nameError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={(text) => {setGender(text)
        setGenderError('')}}


      />
      {/*  terneray operator to render the text : 
                if genderError is true - display message in red color
                if genderError is fals - display nothing  */}
                {genderError ? <Text style={{ color: '#FF6584' , alignSelf:'flex-end',paddingRight:20}}>{genderError}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={(text) => {setAge(text)
        // inline validation
        setAgeError('')}}

        
      />
      {/*  terneray operator to render the text : 
                if ageError is true - display message in red color
                if ageError is fals - display nothing  */}
                {ageError ? <Text style={{ color: '#FF6584' , alignSelf:'flex-end',paddingRight:20}}>{ageError}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={height}
        onChangeText={(text) => {setHeight(text)
        setHeightError('')}}

      />
      {/*  terneray operator to render the text : 
                if heightError is true - display message in red color
                if heightError is fals - display nothing  */}
                {heightError ? <Text style={{ color: '#FF6584' , alignSelf:'flex-end',paddingRight:20}}>{heightError}</Text> : null}
      
        <TextInput
            style={styles.input}
            placeholder="Weight"
            value={weight}
            onChangeText={(text) => {setWeight(text)
            setWeightError('')}}
      />
      {/*  terneray operator to render the text : 
                if weightError is true - display message in red color
                if weightError is fals - display nothing  */}
                {weightError ? <Text style={{ color: '#FF6584' , alignSelf:'flex-end',paddingRight:20}}>{weightError}</Text> : null}
      
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          onPress={()=> {handleSave()}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
         onPress={()=> {firebase.auth().signOut()}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({

heading: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 20,
    
},
input: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ECEAF3',
    width: 400,
    borderRadius:10,
    marginTop: 10
},
separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
},
image: {
    width: 380,
    height: 280,
},
buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#9067C6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default UserProfile;
