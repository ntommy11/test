import React, { useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';

import { StyleSheet, Text, View, Button } from 'react-native';
import {Header} from 'react-native-elements';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery , createHttpLink} from "@apollo/client";

import { GET_CONTINENTS, GET_CONTINENT, SEE_REGIST_LECTURE } from "../queries";
import { Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext, UserContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from './HomeScreen';
import ScheduleScreen from './ScheduleScreen';

const client = new ApolloClient({
    uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

const SampleData = () => {
    const { loading, error, data } = useQuery(GET_CONTINENTS);
  
    console.log(loading);
    console.log(data);
    console.log(error);
  
    let template = ``;
    if (loading) { template = <Text>`로딩중... ${loading}`</Text>; }
    if (error) { template = <Text>`에러발생: ${error}`</Text>; }
    if (data) {
      template = data.continents.map(({ code, name }) =>
        <Text key={code}>{name}</Text>
      )
    }
    return (
      <View>
        <Text>uri: "https://countries.trevorblades.com",</Text>
        <Text>graphql 데이터받기 샘플출력</Text>
        {template}
      </View>
    )
  };
  const SampleData2 = () => {
    const { loading, error, data } = useQuery(SEE_REGIST_LECTURE);
  
    console.log("loading: ",loading);
    console.log("data: ",data);
    console.log("error:",error);
    
    return (
      <View>
        <Text>uri: "https://countries.trevorblades.com",</Text>
        <Text>graphql 데이터받기 샘플출력</Text>

      </View>
    )
  }


const MainContent = () => {
  const userInfo = React.useContext(UserContext);
  const client = new ApolloClient({
    uri: "http://104.208.33.91:4000/",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  });
  console.log(client);
  return (
    <ApolloProvider client={client}>
      <SampleData2 />
    </ApolloProvider>
  )
}
const TwoLineText = () =>{
    return(
      <View style={{paddingTop:10}}>
        <Text style={{color:"white", fontSize:10 }}>서울과학기술대학교 미래융합대학</Text>
        <Text style={{color:"white", fontSize:21, fontWeight:"700"}}>학교생활 도우미</Text>
      </View>
    )
  }
  
export default function MainScreen() {
    return (
        <>
          <Header
            placement="left"
            centerComponent={TwoLineText}
            rightComponent={{ icon: 'person', color: '#fff', paddingTop:15 }}
          />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
  
                if (route.name === '홈') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === '시간표') {
                  iconName = focused ? 'time' : 'time-outline';
                } else if (route.name === '공지') {
                  iconName = focused ? 'notifications' : 'notifications-outline';
                } else if (route.name === '커뮤니티') {
                  iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                }
  
                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: '#148CFF',
              inactiveTintColor: '#dcdcdc',
            }}
          >
            <Tab.Screen name="홈" component={HomeScreen} />
            <Tab.Screen name="시간표" component={ScheduleScreen} />
            <Tab.Screen name="공지" component={MainContent} />
            <Tab.Screen name="커뮤니티" component={MainContent} />
          </Tab.Navigator>
        </>
    );
}
const styles = StyleSheet.create({
    card2: {
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 25,
      borderWidth: 1,
      borderColor: "#dcdcdc",
      borderRadius: 10,
      textAlign: "center",
      justifyContent: "center",
    },
    card: {
      padding: 20,
      margin: 25,
      borderWidth: 1,
      borderColor: "#dcdcdc",
      borderRadius: 10,
      textAlign: "center",
      justifyContent: "center",
    },
    date: {
      margin: 5,
      color: "blue",
      fontSize: 15,
      borderColor: "black",
      textAlign: "center",
      justifyContent: "center",
    },
    time: {
      margin: 5,
      fontWeight: "600",
      fontSize: 20,
      textAlign: "center",
    },
    subject: {
      textAlign: "center",
      fontSize: 30,
      fontWeight: "600",
    },
    location: {
      textAlign: "center",
      fontSize: 10,
      color: "#646464",
    },
    week: {
      margin: 5,
      textAlign: "center",
      fontSize: 10,
      color: "#646464",
    },
    where: {
      marginTop: 7,
      padding: 3,
      borderRadius: 10,
      backgroundColor: "#dcdcdc",
      alignSelf: "center",
      fontSize: 10,
      color: "grey",
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });