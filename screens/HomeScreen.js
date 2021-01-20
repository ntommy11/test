import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {Header} from 'react-native-elements';
import { ApolloClient,  InMemoryCache } from "@apollo/client";
import { AuthContext, UserContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';


const client = new ApolloClient({
    uri: "https://countries.trevorblades.com",
    cache: new InMemoryCache(),
});


const CardInfo = ({user}) => {
    console.log("user in CardInfo:",user);
    return (
      <View style={styles.card}>
        <Text style={styles.date}>2019년 9월 23일 월</Text>
        <Text style={styles.time}>09:00</Text>
        <Text style={styles.subject}>금융과 핀테크</Text>
        <Text style={styles.week}>4주차</Text>
        <View style={styles.where}>
          <Text style={styles.location}>  SC수업 | 무궁관911호   </Text>
        </View>
        <Text>{user}</Text>
      </View>
    )
}
const CardInfo2 = () => {
  const user = React.useContext(UserContext);
  console.log("user in CardInfo2: ", user);
  return (

    <View style={styles.card2}>
      <Text style={{ color: "#787878" }}>컴퓨터 프로그래밍 - 9월 28일 09:00 아름관</Text>
    </View>
  )
}
const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('userEmail');
    if (value !== null) {
      // We have data!!
      console.log("async:",value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
};
export default function HomeScreen() {
    const [user, setUser] = useState(null);
    AsyncStorage.getItem("userEmail").then((data)=>{
      setUser(data);
    })
    console.log("user at HomeScreen:",user);
    const {signOut} = React.useContext(AuthContext);
    return (
      <View>
        <CardInfo user={user}/>
        <Text style={{ textAlign: "left", paddingLeft: 30, fontWeight: "600" }}>다음 일정</Text>
        <CardInfo2 />
        <Text>
          {user}
        </Text>
        <Button
        title="로그아웃"
        onPress={() => signOut()}
      />
      </View>
    )
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
