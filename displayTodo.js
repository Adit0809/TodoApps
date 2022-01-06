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
  View,Image,TouchableOpacity
} from 'react-native';
import axios from 'axios';

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
       // console.log('myuseeffect', res.data)
        setList(res.data);
      })
      .catch(e => {
        console.log('useeffect', e);
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
        console.log('errordelete', e)
      })
  }



  return (

    <View style={{ flex: 1 }}>
      <Text style={style2.head}>TASK</Text>

      <FlatList
        data={list}
        renderItem={({ item, index }) => (<View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
          <CheckBox
              value={item.checked}
              onValueChange={val => {
                statusOfCheck(val, item);
                updateCheck(val, item);
              }}
              style={style2.check} />

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
           
            <TouchableOpacity 
              style={style2.del} 
              onPress={e => {
              del(item.id);  
              deleteItem(item.id)}}>
              <Image source={require('./assets/images/icons8-delete-30.png')} />

            </TouchableOpacity>
            
           
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
  head: {borderRadius:15,
    borderWidth:1,
    padding: 5,
    margin: 5,
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: 'lightgreen',
  },
  liststyle: {
backgroundColor:'skyblue',
    fontSize: 25,
    borderWidth:1,
    color: 'blue',
    margin: 10,
    width: 250,
    padding: 20,    
    borderRadius: 15,
  },
  btn: { padding: 10, color: 'blue' },
  check:{
    fontSize:25,
    backgroundColor:'white',
    color:'violet',
    margin:10,
    padding:20,
    borderRadius:15,
    alignSelf:'center',borderWidth:1,
  },
  del: {
    textAlign:'center',
    justifyContent:'center',
    fontSize: 25,
    backgroundColor: 'white',
    color: 'blue',
    margin: 10,
    padding: 20,
    borderRadius: 15,
    backgroundColor:"skyblue"
  },
});

export default Display;