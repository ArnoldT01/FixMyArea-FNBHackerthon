import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Sign-up failed. Please check your information.';
      setErrorMessage(msg);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setErrorMessage('');

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(home)");
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message ||
        'Verification failed. Please check your code.';
      setErrorMessage(msg);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { width: '80%', textAlign: 'center', marginBottom: 20, }]}>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter verification code"
          onChangeText={setCode}
          style={styles.input}
        />
        <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Create a new account to get started and enjoy seamless access to our features
      </Text>

      <TextInput
        autoCapitalize="words"
        value={firstName}
        placeholder="First Name"
        onChangeText={setFirstName}
        style={styles.input}
      />
      <TextInput
        autoCapitalize="words"
        value={lastName}
        placeholder="Last Name"
        onChangeText={setLastName}
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter Email"
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Enter new Password"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={setConfirmPassword}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 50, fontWeight: 'bold' },
  subtitle: {
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    textAlign: 'center',
    marginBottom: 30,
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
  errorContainer: { height: 20, justifyContent: 'center', marginBottom: 10 },
  errorText: { color: 'red', textAlign: 'center', fontSize: 14, width: '80%' },
  button: { backgroundColor: '#3db67e', width: '80%', borderRadius: 50, marginBottom: 40 },
  buttonText: { fontSize: 16, paddingVertical: 15, textAlign: 'center', color: '#fff', fontWeight: '700' },
  signInContainer: { flexDirection: 'row', justifyContent: 'center' },
  signInLink: { color: '#007AFF', fontWeight: '700' },
});
