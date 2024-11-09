import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text , View , TextInput , TouchableOpacity , Alert, SafeAreaView , KeyboardAvoidingView , Platform , Image } from 'react-native';
import { useState, useEffect } from 'react';
import { initDatabase, registerUser, loginUser } from './utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App()
{
    const [isLogin, setIsLogin] =  useState(true)
   const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        initDatabase()
        checkLoginStatus()
    } , [])

    const checkLoginStatus = async () => {
         const status = await AsyncStorage.getItem('isLoggedIn')
        if (status === 'true') {
            setIsLoggedIn(true)
        }
    }
 const handleSubmit = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }

  try {
            if (isLogin) {
                const success = await loginUser(username, password)
                if (success) {
                    await AsyncStorage.setItem('isLoggedIn', 'true')
                    setIsLoggedIn(true)
                    Alert.alert('Success', 'Logged in successfully')
                } else 
                {
                    Alert.alert('Error', 'Invalid credentials')
                }
            } else {
                await registerUser(username, password)
                Alert.alert('Success', 'Registration successful')
                setIsLogin(true)
            }
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false)
        setUsername('')
        setPassword('')
    }

    if (isLoggedIn) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loggedInContainer}>
                    <Image
                        source={require('./assets/avatar.png')}
                        style={styles.avatar}
                    />
                    <Text style={styles.welcomeTitle}>
                        Welcome, {username}!
                    </Text>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}  >
                <View style={styles.formContainer}>
                   
                    <Image
                        source={require('./assets/icon.png')}
                        style={styles.logo}
                    />
                    
                    <Text style={styles.title}>
                        {isLogin ? 'Welcome Back!' : 'Create Account'}
                    </Text>
                   
                    <Text style={styles.subtitle}>
                        {isLogin
                            ? 'Please sign in to continue'
                            : 'Please fill in the form to continue'}
                    </Text>

              <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            placeholderTextColor="#666"
                            autoCapitalize="none"
                        />
             <TextInput
                    style={styles.input}
                    placeholder="Password"
                     value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#666"
                    autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.mainButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>
                            {isLogin ? 'Sign In' : 'Sign Up'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.switchButton}
                        onPress={() => setIsLogin(!isLogin)}
                    >
                        <Text style={styles.switchText}>
                            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loggedInContainer: {
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    logoutButton: {
        backgroundColor: '#d9534f',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    formContainer: {
        alignItems: 'center',
        width: '80%'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    mainButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    },
    switchButton: {
        marginTop: 10
    },
    switchText: {
        color: '#007bff',
        fontSize: 14
    },
    keyboardView: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
