import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper';

const AddHabits = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("")
  const freqButton =[
        {
      label:'Daily',
      value:'daily'
    },{
      label:'Weekly',
      value:'weekly'
    },
    {
      label:'Monthly',
      value:'monthly'
    }
  ]
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Add Habit</Text>
        <TextInput mode='outlined' value={title} label="Title" style={styles.inputText} onChangeText={(text) => setTitle(text)} />
        <TextInput mode='outlined' value={description} style={styles.inputText} label="Description" onChangeText={(text) => setDescription(text)} />
          <SegmentedButtons value={frequency} 
          onValueChange={freq=>setFrequency(freq)} 
          buttons={freqButton}
          style={
            {
              marginVertical:10
            }
          }
            >
          </SegmentedButtons>
      </View>
      <Button disabled={!title.trim() || !description.trim()} mode='contained'>Add Habit</Button>
    </View>
  )
}

export default AddHabits

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20
  },
  inputText: {
    'margin': 5,
    'backgroundColor': "white",
    'borderColor': ''
  },
  heading: {
    'fontSize': 28,
    'textAlign': 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  inputContainer:{
    gap:2,
    marginBottom:10
  }
})