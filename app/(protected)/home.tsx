import { SignedIn, useAuth } from "@clerk/clerk-expo"
import { Image } from "expo-image"
import { router, useRootNavigationState, useSegments } from "expo-router"
import { Search } from "lucide-react-native"
import { useEffect } from "react"
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function App() {
  const { isSignedIn, isLoaded, signOut } = useAuth()
  const navigationState = useRootNavigationState()

  useEffect(() => {
    if (!isSignedIn) {
      if (!navigationState) return
      if (!navigationState.key) return

      router.replace('/login')
    }
  }, [isLoaded, useRootNavigationState])

  return (
    <SignedIn>
      <View className='flex items-center pt-14'>
        <Text className='text-2xl'>Search</Text>
        <View className='flex flex-row items-center mt-2'>
          <TextInput className='w-[80vw] px-4 py-1 rounded-full border-gray-300 border-2 border-solid' placeholder='Search'></TextInput>
          <TouchableOpacity className='absolute right-4'>
            <Search className='text-gray-600 text-opacity-65' />
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex h-[80%] items-center mt-14 gap-6'>
        {/* BLOCK EXAMPLE */}

        <View className='w-[80%] h-[8rem] flex flex-row'>
          <Image source='https://picsum.photos/seed/696/300/200' style={{
            width: 128
          }} />
          <View className='pl-4 text-wrap'>
            <Text className='font-semibold text-xl'>Fried Fish</Text>
            <Text className='w-[11rem] text-sm'>very cool, and awesome lol. This text so big it overflow, should wrap to new line doe</Text>
          </View>
        </View>

        <View className='w-[80%] h-[8rem] flex flex-row'>
          <Image source='https://picsum.photos/seed/696/300/200' style={{
            width: 128
          }} />
          <View className='pl-4 '>
            <Text className='font-semibold text-xl'>Fish Fried</Text>
            <Text className='w-[11rem] text-sm'>amen break</Text>
          </View>
        </View>

        <View className='w-[80%] h-[8rem] flex flex-row'>
          <Image source='https://picsum.photos/seed/696/300/200' style={{
            width: 128
          }} />
          <View className='pl-4 '>
            <Text className='font-semibold text-xl'>Friend Fried</Text>
            <Text className='w-[11rem] text-sm'>blap blap blap blap blap blap blap blap</Text>
          </View>
        </View>


        <Button onPress={() => signOut()} title="logout" className='p-4 bg-orange-300' />
      </View>
    </SignedIn>
  )
}
