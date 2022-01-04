import React from 'react';
import {useEffect, useState, useContext} from 'react';
import {FAB, CheckBox} from 'react-native-elements';
import {TodoContext} from './contextDo';

import {
  StyleSheet,
  Text,
  FlatList,
 View,
} from 'react-native';

const Display = props => {
  // console.log(>>>>>>>>>>>>props)

  const {list, setList} = useContext(TodoContext);
  // const {edit, setEdit} = useContext(TodoContext);
  // const route = useRoute();

  const {navigation} = props;

  const del = id => {
    setList(pre => pre.filter(items => items?.id !== id));
  };
  return (
    //  <ScrollView>
    <View style={{flex: 1}}>
      <Text style={style2.head}>TASK</Text>

      <FlatList
        data={list}
        renderItem={({item, index}) => (
          <View style={{flex: 1, flexDirection: 'row'}}>
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
            <Text
              style={style2.del}
              onPress={e => {
                del(item.id);
              }}>
              D
            </Text>
            <CheckBox/>
          </View>
        )}
        //    keyExtractor={item => item.index}
        //  scrollEnabled={true}
      />

      <FAB
        visible={true}
        title=">>>>"
        color="crimson"
        onPress={() => {
          navigation.push('B');
        }}
        style={style2.btn}
      />
    </View>
    //  </ScrollView>
  );
};
const style2 = StyleSheet.create({
  head: {
    padding: 10,
    margin: 10,
    textAlign: 'center',
    fontSize: 25,
    color: 'black',
    backgroundColor: 'white',
  },
  liststyle: {
    fontSize: 25,
    backgroundColor: 'white',
    color: 'blueviolet',
    margin: 10,
    width: 300,
    padding: 20,
    borderRadius: 15,
  },
  btn: {padding: 10, color: 'blue'},
  del: {
    fontSize: 25,
    backgroundColor: 'white',
    color: 'blueviolet',
    margin: 10,
    padding: 20,
    borderRadius: 15,
  },
});

export default Display;