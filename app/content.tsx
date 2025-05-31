import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/actions/action';

const Content = () => {
    const user = useSelector(
    (state: any) => state.commonReducer.user,
  );
  const dispatch = useDispatch()
  return (
    <View style={{flex: 1}}>
      <Text>content {user}</Text>
      <Pressable onPress={()=>{
       // dispatch(setUser("Hasitha 1"))

      }}>
        <Text>Updaete Name</Text>
      </Pressable>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({})