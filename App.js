/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import 'react-native-gesture-handler';
 import {NavigationContainer} from '@react-navigation/native';
 import {createNativeStackNavigator} from '@react-navigation/native-stack';
 import {useState, useContext} from 'react';
 import {
   Text,
   View,
 } from 'react-native';
 

 import Display from './displayTodo';
 import Input from './inputTodo';
 import {TodoContext} from './contextDo';
 import Edit from './edit';
 const Stack = createNativeStackNavigator();
 
 const App = () => {
   
   const [list, setList] = useState([]);
   
 
   return (
     <TodoContext.Provider
       value={{
         list,
         setList,
         
       }}>
    
       <View
         style={{
           flex: 1,
           backgroundColor: 'skyblue'
         }}>
         <Text style={{textAlign: 'center', fontSize: 30, color: 'crimson'}}>
           TODO LIST
         </Text>
 
         <NavigationContainer>
           <Stack.Navigator screenOptions={{headerShown: false}}>
             <Stack.Screen name="A" component={Display} />
             <Stack.Screen name="B" component={Input} />
             <Stack.Screen name="C" component={Edit} />
           </Stack.Navigator>
         </NavigationContainer>
       </View>
  
     </TodoContext.Provider>
   );
 };

export default App;



// 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
