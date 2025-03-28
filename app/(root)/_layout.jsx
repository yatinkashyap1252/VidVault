import { Stack } from 'expo-router'
import React from 'react'

const RootLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='(tabs)' options={{headerShown:false}} />
        <Stack.Screen name='VideoPage' options={{headerShown:false}} />
        <Stack.Screen name='videoCard' options={{headerShown:false}} />
        <Stack.Screen name='downloadPage' options={{headerShown:false}} />
        <Stack.Screen name='ParagraphRewrite' options={{headerShown:false}} />
        <Stack.Screen name='TextTweak' options={{headerShown:false}} />
        <Stack.Screen name='TextTranslate' options={{headerShown:false}} />
        <Stack.Screen name='EVPage' options={{headerShown:false}} />
    </Stack>
  )
}

export default RootLayout