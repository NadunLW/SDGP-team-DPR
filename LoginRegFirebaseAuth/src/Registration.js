import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native'

const Registration = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validate = () => {
    let firstNameError = ''
    let lastNameError = ''
    let emailError = ''
    let passwordError = ''

    // checking if firstName is empty
    if (!firstName) {
      firstNameError = 'Please enter your first name'
    }

    // checking if lastName is empty
    if (!lastName) {
      lastNameError = 'Please enter your last name'
    }

    // checking if email is a valid email format
    if (!email.includes('@') || !email.includes('.')) {
      emailError = 'Please enter a valid email address'
    }

    // checking if password is at least 8 characters long
    if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters'
    }

    // checking if any of the errors exist, and setting the state of the corresponding error message and returning false
    if (firstNameError || lastNameError || emailError || passwordError) {
      setFirstNameError(firstNameError)
      setLastNameError(lastNameError)
      setEmailError(emailError)
      setPasswordError(passwordError)
      return false
    }

    // if all the fields are filled with valid input, return true to continue
    return true
}

  const registerUser = async (email, password, firstName, lastName) => {
    const isValid = validate()
    if (isValid) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          // firebase
          //   .auth()
          //   .currentUser.sendEmailVerification({
          //     handleCodeInApp: true,
          //     url: 'https://logregauth-610cf.firebaseapp.com',
          //   })
          //   .then(() => {
          //     alert('Verification email sent\nCheck spam Folder')
          //   })
          //   .catch((error) => {
          //     alert(error.message)
          //   })

          firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
              firstName,
              lastName,
              email,
            })
            .catch((error) => {
              alert(error.message)
            })
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }

    return(
        <View style={{flex: 1, alignItems: 'center', paddingTop: 5}}>

            <View style={styles.imageContainer}>
                <Image source={require('../assets/registration.png')} style={styles.image} />
            </View>
            
            <Text style={{fontWeight:'bold',fontSize:23,color: '#242038'}}>
                Register Here!
            </Text>
            {/* create view for inputs */}
            <View style={{marginTop:40}}>
                {/* First name  */}
                <TextInput
                    style={styles.textInput}
                    placeholder='First Name'
                    onChangeText={(firstName) => {
                        setFirstName(firstName)
                        // inline validation
                        setFirstNameError('')}}
                    autoCorrect={false}
                />
                {/*  terneray operator to render the text : 
                if firstNameError is true - display message in red color
                if firstNameError is fals - display nothing  */}
                {firstNameError ? <Text style={{ color: '#FF6584' , alignSelf:'flex-end'}}>{firstNameError}</Text> : null}


                {/* Last name  */}
                <TextInput
                    style={styles.textInput}
                    placeholder='Last Name'
                    onChangeText={(lastName) => {
                        setLastName(lastName)
                        // inline validation
                        setLastNameError('')}}
                    autoCorrect={false}
                />
                {/*  terneray operator to render the text : 
                if lastNameError is true - display message in red color
                if lastNameError is fals - display nothing  */}
                {lastNameError ? <Text style={{ color: '#FF6584', alignSelf:'flex-end'}}>{lastNameError}</Text> : null}
                
                
                {/* Email  */}
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email) => {
                        setEmail(email)
                        // inline validation
                        setEmailError('')}}
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='email-address'
                />
                {/*  terneray operator to render the text : 
                if emailError is true - display message in red color
                if emailError is fals - display nothing  */}
                {emailError ? <Text style={{ color: '#FF6584', alignSelf:'flex-end'}}>{emailError}</Text> : null}
                
                
                {/* Password  */}
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(password) => {
                        setPassword(password)
                        setPasswordError('')}}
                    autoCorrect={false}
                    autoCapitalize='none'
                    secureTextEntry= {true}
                />
                {/*  terneray operator to render the text : 
                if passwordError is true - display message in red color
                if passwordError is fals - display nothing  */}
                {passwordError ? <Text style={{ color: '#FF6584', alignSelf:'flex-end'}}>{passwordError}</Text> : null}
                
            </View>
            {/* creating the buttons */}
            <TouchableOpacity
                onPress={()=> registerUser(email,password,firstName,lastName)}
                style = {styles.button}
            >
            <Text style={{color: '#fff',fontWeight: 'bold',fontSize: 18}}>Register</Text>


            </TouchableOpacity>
            {/* text to navigate to Login page */}
            <TouchableOpacity
                onPress={()=> navigation.navigate('Login')}
                style = {{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:16,color: '#242038'}}>
                    Already an User?  <Text style={{color: '#FF6584'}}>Login</Text>
                </Text>
            </TouchableOpacity>

        </View>
    )

}

export default Registration

// styles for the components
const styles = StyleSheet.create({

    textInput:{
        paddingTop: 20,
        paddingBottom: 20,
        width: 400,
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
        backgroundColor:'#ECEAF3',
        borderRadius: 12,
        fontSize: 16,
        paddingLeft:20,
        color: '#242038',
        
    },
    button: {
        backgroundColor: '#242038',
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
        width: 200,
        height: 200,
    },
})