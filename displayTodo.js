import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { FAB, CheckBox } from 'react-native-elements';
import { TodoContext } from './contextDo';
import { Button } from 'react-native';

import {
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import axios from 'axios';
// import { Button } from 'react-native';

const Display = props => {


  const { list, setList } = useContext(TodoContext);
  const urilist={...list};

  const { navigation } = props;

  const del = id => {
    setList(pre => pre.filter(items => items?.id !== id));
  };
  useEffect(()=>{
    axios
    .get('http://10.0.2.2:8888/todo1')
    .then(res=>{
      console.log('myuseeffect',res.data)
      setList(res.data);})
      .catch(e=>{
        console.log('eeerrr',e);
      });
    },[]);

    // const updateItem=(val,item)=>{
    //   axios
    //   .post('http://10.0.2.2:8888/todo1',{
    //     title:item.title

    //   })
    //   .then(data=>{})
    //   .catch(e=>{
    //     console.log('error<>',e);
    //   })
    // }

    const deleteItem=id=>{
      axios
      .post('http://10.0.2.2:8888/todo/delete',{
        uid:id,
      })
      .then(data=>{})
      .catch(e=>{
        console.log('error<>',e)
      })
    }



  return (

    <View style={{ flex: 1 }}>
      <Text style={style2.head}>TASK</Text>

      <FlatList
        data={list}
        renderItem={({ item, index }) => (
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text
              style={style2.liststyle}
              onPress={e => {
                navigation.navigate('C', {
                  name: item?.title,
                  uid: item?.id,
                });
              }}>
              {item?.title}
            </Text>
            {/* <Button> </Button> */}
            <Text
              style={style2.del}
              onPress={e => {
                del(item.id);
                deleteItem(item.id)
              }}>
              D
            </Text>
                     </View>
        )}


      />

      <FAB
        visible={true}
        title="Add Task"
        color="blue"
        onPress={() => {
          navigation.push('B');
        }}
        style={style2.btn}
      />
    </View>

  );
};
const style2 = StyleSheet.create({
  head: {
    padding: 10,
    margin: 10,
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: 'lightgreen',
  },
  liststyle: {
    fontSize: 25,
    backgroundColor: 'white',
    color: 'blue',
    margin: 10,
    width: 300,
    padding: 20,
    borderRadius: 15,
  },
  btn: { padding: 10, color: 'blue' },
  del: {
    fontSize: 25,
    backgroundColor: 'white',
    color: 'blue',
    margin: 10,
    padding: 20,
    borderRadius: 15,
  },
});

export default Display;