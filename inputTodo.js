import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { FAB } from 'react-native-elements';
import { TodoContext } from './contextDo';
const axios = require('axios').default;

import {multiline,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { BottomSheet } from 'react-native-elements/dist/bottomSheet/BottomSheet';
const Input = props => {
    const { list, setList } = useContext(TodoContext);
    const { navigation } = props;

    const [text, setText] = useState('');
   

    const addition = () => {
        setList(list => list.concat(
            {
                title: text,
                id: Date.now(),
                checked:false
            }),

        );
        navigation.push('A');

    };

    const apicall = () => {

        console.log('list value', list)
        axios
            .post('http://10.0.2.2:8888/todo/add', {
                title: text,
                id: Date.now(),
                checked:false
            })
            .then(data => {
                

              
            })

            .catch(e => {
                console > log('error found>>>', e);

            })
    };




    return (
        <View style={{ flex: 1 }}>
            <Text style={style1.heading}>Add your task:</Text>
            <TextInput
                multiline
                style={style1.input}
                placeholder="Task...."
                onChangeText={val => setText(val)}
            />
            <FAB
                visible={true}
                title="ADD"
                icon={{ color: 'white' }}
                size="small"
                style={style1.btn}
                onPress={() => {
                    addition();
                    apicall();
                }}
            />
            <FAB
                visible={true}
                title="Go Back"
                icon={{ color: 'white' }}
                size="small"
                style={style1.btn1}
                onPress={() => {
                    navigation.goBack();
                }}
            />

        </View>
    );
};

const style1 = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        color: 'black',
        margin: 10,
        padding: 15,
        borderRadius: 20,
    },
    heading: { fontSize: 20, margin: 5, padding: 15 },
    btn: { position: 'absolute', bottom: 0, right: 1, margin: 20 },
    btn1: { position: 'absolute', bottom: 0, left: 1, margin: 20 },
});

export default Input;