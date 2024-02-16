import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Mail, Lock } from 'lucide-react-native'
import React, { useEffect, useState } from 'react';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import { router, useRootNavigationState } from 'expo-router';

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const [timesPressed, setTimesPressed] = useState(0)
  const { isSignedIn } = useAuth()
  const navigationState = useRootNavigationState()

  const [emailAddress, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password
      })

      await setActive({ session: completeSignIn.createdSessionId })

      router.replace('/home')
    } catch (err: any) {
      alert('Invalid Username or Password')
    }
  }

  useEffect(() => {
    if (!navigationState) return
    if (!navigationState.key) return
    if (isSignedIn) router.replace('/home')
  }, [navigationState])

  return (
    <View className='flex items-center justify-center h-full'>
      <View className='flex flex-col gap-2'>
        <View className='flex flex-row items-center'>
          <Mail className='text-black absolute left-4' />
          <TextInput autoCapitalize="none" value={emailAddress} onChangeText={(email) => setEmail(email)} placeholder='Email' className='pl-16 p-3 text-lg rounded-full border-orange-300 border-solid border-2 w-[16rem]'></TextInput>
        </View>
        <View className='flex flex-row items-center mb-2'>
          <Lock className='text-black absolute left-4' />
          <TextInput value={password} onChangeText={(pwd) => setPassword(pwd)} secureTextEntry={true} placeholder='Password' className='pl-16 p-3 text-lg rounded-full border-orange-300 border-solid border-2 w-[16rem]'></TextInput>
        </View>
        <TouchableOpacity onPress={onSignInPress} style={
          {
            backgroundColor: 'orange',
            padding: 16,
            borderRadius: 100,
            alignItems: 'center'
          }
        }>
          <Text className='text-md'>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
