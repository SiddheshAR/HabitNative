import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

const AddHabits = () => {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [frequency,setFrequency]=useState("")
  return (
    <View>
        <TextInput value={title} label="Title" onChangeText={(text)=>setTitle(text)} />
                  <TextInput value={description} label="Description" onChangeText={(text)=>setDescription(text)} />

    </View>
  )
}

export default AddHabits

const styles = StyleSheet.create({})