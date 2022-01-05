import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { FAB} from 'react-native-elements';
import { TodoContext } from './contextDo';
import { Button } from 'react-native';
import CheckBox from  '@react-native-community/checkbox';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import axios from 'axios';
import { status } from 'express/lib/response';
// import { Button } from 'react-native';

const Display = props => {


  const { list, setList } = useContext(TodoContext);
  const urilist = { ...list };

  const { navigation } = props;

  const del = id => {
    setList(pre => pre.filter(items => items?.id !== id));
  };
  useEffect(() => {
    axios
      .get('http://10.0.2.2:8888/todo1')
      .then(res => {
        console.log('myuseeffect', res.data)
        setList(res.data);
      })
      .catch(e => {
        console.log('eeerrr', e);
      });
  }, []);

  const  statusOfCheck=(val,item)=>{
    var data=[...list];
    data=data.map(itm=>{
      if (itm===item){
      return{...itm,checked:val};
    }return{...itm};
    });setList(data);
  }

  const updateCheck=(val,item)=>{
    axios
    .post('http://10.0.2.2:8888/todo/updatecheck',{
      checked:val,
      title:item.title

    })
    .then(data=>{})
    .catch(e=>{
      console.log('error<5>',e);
    })
  }

  const deleteItem = id => {
    axios
      .post('http://10.0.2.2:8888/todo/delete', {
        uid: id,
      })
      .then(data => { })
      .catch(e => {
        console.log('error<>', e)
      })
  }



  return (

    <View style={{ flex: 1 }}>
      <Text style={style2.head}>TASK</Text>

      <FlatList
        data={list}
        renderItem={({ item, index }) => (<View>
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
            <CheckBox
              value={item.checked}
              onValueChange={val => {
                statusOfCheck(val, item);
                updateCheck(val, item);
              }}
              style={style2.check} />

          </View>
          <Text>
            {item.checked ? 'status completed' : 'status Incomleted'}
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
    width: 250,
    padding: 20,
    borderRadius: 15,
  },
  btn: { padding: 10, color: 'blue' },
  check:{
    fontSize:20,
    backgroundColor:'white',
    color:'violet',
    margin:10,
    padding:20,
    borderRadius:10,
    alignSelf:'center'
  },
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