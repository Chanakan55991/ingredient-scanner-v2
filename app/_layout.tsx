import { Stack } from 'expo-router'

import '../global.css'
import { ClerkProvider } from '@clerk/clerk-expo'

export default () => {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Stack>
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ClerkProvider>
  )
}
