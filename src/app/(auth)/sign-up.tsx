import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from "react";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')

  const [errorMessage, setErrorMessage] = useState('');
  
  const onSignUpPress = async () => {
    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    setErrorMessage('');

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message || 'Sign-in failed. Please check your credentials.';
      setErrorMessage(msg);
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <TouchableOpacity onPress={onVerifyPress}>
          <Text>Verify</Text>
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Create a new account to get started and enjoy seamless access to our features
        </Text>

        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(email) => setEmailAddress(email)}
          style={styles.input}
        />
        <TextInput
          value={password}
          placeholder="Enter new password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          style={styles.input}
        />

        <View style={styles.errorContainer}>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>

        <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text>Already have an account? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <Text style={styles.signInLink}>Sign In Here</Text>
          </Link>
        </View>

      </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 50, fontWeight: 'bold', marginTop: 50 },
  subtitle: {
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    textAlign: 'center',
    marginBottom: 50,
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: '80%',
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  errorContainer: {
    height: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    width: '80%',
  },
  button: {
    backgroundColor: '#3db67e',
    width: '80%',
    borderRadius: 50,
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 16,
    paddingVertical: 15,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
  },
  signInContainer: { flexDirection: 'row', justifyContent: 'center' },
  signInLink: { color: '#007AFF', fontWeight: '700' },
});



// add extra fields : first name, last name, confirm password