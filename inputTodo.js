import React from 'react';
import {useEffect, useState, useContext} from 'react';
import {FAB} from 'react-native-elements';
import {TodoContext} from './contextDo';

import {
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {BottomSheet} from 'react-native-elements/dist/bottomSheet/BottomSheet';
const Input = props => {
  const {list, setList} = useContext(TodoContext);
  const {navigation} = props;
  
  const [text, setText] = useState('');
  //const {title, id} = route.params;

  const addition = () => {
    setList(list => [
      {
        title: text,
        id: Date.now(),
      },
      ...list,
    ]);
    navigation.push('A');
  };

  return (
    <View style={{flex: 1}}>
      <Text style={style1.heading}>Add your task:</Text>
      <TextInput
        style={style1.input}
        placeholder="Task...."
        onChangeText={val => setText(val)}
      />
      <FAB
        visible={true}
        title="ADD"
        icon={{color: 'white'}}
        size="small"
        style={style1.btn}
        onPress={() => {
          addition();
        }}
      />
      <FAB
        visible={true}
        title="<<<<"
        icon={{color: 'white'}}
        size="small"
        style={style1.btn1}
        onPress={() => {
          navigation.goBack();
        }}
      />
      {/* <Text>{text}</Text> */}
    </View>
  );
};

const style1 = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    color: 'red',
    margin: 10,
    padding: 15,
    borderRadius: 20,
  },
  heading: {fontSize: 20, margin: 5, padding: 15},
  btn: {position: 'absolute', bottom: 0, right: 1, margin: 20},
  btn1: {position: 'absolute', bottom: 0, left: 1, margin: 20},
});

export default Input;