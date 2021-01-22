import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HeaderScreen from './screens/Header';
import RootStackScreen from './screens/RootStackScreen';

import { AuthContext, UserContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';

// 통신 패키지 
import { ApolloClient, ApolloProvider, InMemoryCache, useMutation, useQuery, useLazyQuery, createHttpLink } from "@apollo/client";
import {LOGIN} from './queries';
import {SEE_REGIST_LECTURE} from './queries';


const client = new ApolloClient({
  uri: "http://104.208.33.91:4000/",
  cache: new InMemoryCache(),
});
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function getUserInfo( ){
  const { loading, error, data } = useQuery(SEE_REGIST_LECTURE);
  console.log("test");
  console.log(loading);
  console.log(data);
  console.log(error);

  let template = ``;
  if (loading) { template = <Text>`로딩중... ${loading}`</Text>; }
  if (error) { template = <Text>`에러발생: ${error}`</Text>; }
  if (data) {
    console.log(data);
  }
  return;
}

function Sub() {
  //const [isLoading, setIsLoading] = React.useState(true);
  //const [token, setUserToken] = React.useState(null);
  const [userEmail, setUserEmail] = React.useState(null);
  const [loginMutation] = useMutation(LOGIN);


  const initialLoginState = {
    isLoading: true,
    email: null,
    token: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type){
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          email: action.email,
          token: action.token,
          isLoading: false,
        };    
      case 'LOGIN':
        return {
          ...prevState,
          email: action.id,
          token: action.token,
          isLoading: false,
        };  
      case 'LOGOUT':
        return {
          ...prevState,
          email: null,
          token: null,
          isLoading: false,
        };  
      case 'REGISTER':
        return {
          ...prevState,
          email: action.id,
          token: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async (email, password) => {
      //setUserToken('abc');
      //setIsLoading(false);
      let token;
      let data;
      data = await loginMutation({
        variables: {
          email: email,
          password: password
        }
      });
      console.log(data.data.login);
      token = data.data.login;
      if (token){
        try{
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userEmail', email);
        }catch(e){
          console.log(e);
        }
        
      }
      console.log('user: ', email);
      console.log('pass: ', password);
      console.log('jwt: ', token);
      setUserEmail(email);
      dispatch({ type: "LOGIN", id: email, token: token});
    },
    signOut: async () => {
      console.log("sign out");
      //setUserToken(null);
      //setIsLoading(false);
      try{
        let tmp = await AsyncStorage.getItem('userEmail');
        console.log(tmp);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userEmail');
      }catch(e){
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });

    },
    signUp: () => {
      //setUserToken('abc');
      //setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let token;
      let userEmail;
      token = null;
      userEmail = null;
      try{
        token = await AsyncStorage.getItem('token');
        userEmail = await AsyncStorage.getItem('userEmail');
      }catch(e){
        console.log(e);
      }
      console.log('token: ', token);
      console.log('userEmail: ', userEmail);
      setUserEmail(userEmail);
      dispatch({ type: "RETRIEVE_TOKEN", token: token, email: userEmail});
    }, 3000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={loginState}>
        <NavigationContainer>
          {loginState.token !== null ? (
            <MainScreen />
          ):(
            <RootStackScreen />
          )}

        </NavigationContainer>
        </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default function App(){
  return(
    <ApolloProvider client={client}>
      <Sub />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
