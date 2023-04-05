import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'


const Login = () => {

    const navigation = useNavigation()

    // define state variables for email and password
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    // to validate
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validate = () => {
        let emailError = '';
        let passwordError = '';
    
        // checking if email is a valid email format
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError = 'Please enter a valid email address';
        }
    
        // checking if password is at least 8 characters long
        if (!password || password.length < 8) {
            passwordError = 'Password must be at least 8 characters';
        }
    
        // setting the state of the corresponding error message
        setEmailError(emailError);
        setPasswordError(passwordError);
    
        // checking if any of the errors exist, and returning false
        if (emailError || passwordError) {
            return false;
        }
    
        // if all the fields are filled with valid input, return true to continue
        return true;
    };
    
    
    

    // function to log in user with Firebase authentication
    const loginUser = async (email,password) =>{
        const isValid = validate()
        if (isValid){
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error){
            // alert user if there is an error with login
            alert(error.message)
        }}
    }

    return(
        <View style = {styles.container}>

            <View style={styles.imageContainer}>
                <Image source={require('../assets/login.png')} style={styles.image} />
            </View>
            
            {/* ----------------------------- */}
            <Text style = {{fontWeight: 'bold', fontSize:26, marginTop: 40,color: '#242038'}}>
                Login
            </Text>
            

            {/* text inputs for email and password */}
            <View style={{marginTop:40 }}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    onChangeText={(email)=> {setEmail(email)
                    setEmailError('')}}
                    autoCapitalize='none'
                    autoCorrect = {false}
                />
                {/*  terneray operator to render the text : 
                if emailError is true - display message in red color
                if emailError is fals - display nothing  */}
                {emailError ? <Text style={{ color: '#FF6584' , alignSelf:'flex-end'}}>{emailError}</Text> : null}


                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    onChangeText={(password)=> {
                        setPassword(password)
                        setPasswordError('')
                    }}
                    autoCapitalize='none'
                    autoCorrect = {false}
                    secureTextEntry={true}
                />
                {/*  terneray operator to render the text : 
                if passwordError is true - display message in red color
                if passwordError is fals - display nothing  */}
                {passwordError ? <Text style={{ color: '#FF6584' , alignSelf:'flex-end'}}>{passwordError}</Text> : null}

            </View>

            {/* button to log in user */}
            <TouchableOpacity
                onPress={()=> loginUser(email,password)}
                style = {styles.button}
            >
                <Text style={{
                    color: '#fff',fontWeight: 'bold',fontSize: 18,}}>Login</Text>
            </TouchableOpacity>

            {/* text to navigate to registration page */}
            <TouchableOpacity
                onPress={()=> navigation.navigate('Registration')}
                style = {{marginTop:20}}
            >
                <Text style={{fontWeight:'bold', fontSize:16, color: '#242038'}}>
                    Don't have an account? <Text style={{color: '#FF6584'}}>Register Now</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login

// styles for the components
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 100,

    },
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
        marginTop: 40,
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
})
