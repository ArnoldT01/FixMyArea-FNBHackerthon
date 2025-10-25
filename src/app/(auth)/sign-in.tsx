import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return

    setErrorMessage('');

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setErrorMessage('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      const msg =
        err?.errors?.[0]?.longMessage ||
        err?.errors?.[0]?.message || 'Sign-in failed. Please check your credentials.';
      setErrorMessage(msg);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ fontSize: 50, fontWeight: 'bold', marginTop: 50, }}>
        Sign in
      </Text>

      <Text style={{ fontSize: 16, paddingVertical: 15, paddingHorizontal: 16, textAlign: 'center', marginBottom: 50, width: '80%' }} >
        Enter you email and password to access your account
      </Text>

      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          width: '80%',
          paddingHorizontal: 16,
          paddingVertical: 15,
          fontSize: 16,
          marginBottom: 20,
        }}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          width: '80%',
          paddingHorizontal: 16,
          paddingVertical: 15,
          fontSize: 16,
          marginBottom: 40,
        }}
      />

      <View
        style={{
          height: 20,
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        {errorMessage ? (
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
              fontSize: 14,
              width: '80%',
            }}
          >
            {errorMessage}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={onSignInPress} style={{ backgroundColor: '#3db67e', width: '80%', borderRadius: 50, marginBottom: 40, }}>
        <Text style={{ fontSize: 16, paddingVertical: 15, paddingHorizontal: 16, textAlign: 'center', color: '#ffffff', fontWeight: '700' }} >Continue</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text>Don't have an account? </Text>
        <Link href="/(auth)/sign-up" asChild>
          <Text style={{ color: "#007AFF", fontWeight: "700" }}>Sign Up Here</Text>
        </Link>
      </View>

    </View>
  )
}

// clean up repeated code