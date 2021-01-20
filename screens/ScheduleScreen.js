import React from 'react';
import {Text, View,StyleSheet, ScrollView } from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import { UserContext } from '../components/context';

const list = [
    {
      title: 'Appointments',
      icon: 'av-timer'
    },
    {
      title: 'Trips',
      icon: 'flight-takeoff'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
    {
        title: 'Trips',
        icon: 'flight-takeoff'
    },
    {
      title: 'Trips',
      icon: 'flight-takeoff'
    },
  ]

function WeeklyHeader(){
    return (
        <View style={styles.weeklyHeader}>
            <View style={styles.weeklyHeaderBox}>
                <Text style={styles.weeklyHeaderText}>구분</Text>
            </View>
            <View style={styles.weeklyHeaderBox}>
                <Text style={styles.weeklyHeaderText}>월</Text>
            </View>
            <View style={styles.weeklyHeaderBox}>
                <Text style={styles.weeklyHeaderText}>화</Text>
            </View>
            <View style={styles.weeklyHeaderBox}>
                <Text style={styles.weeklyHeaderText}>수</Text>
            </View >
            <View style={styles.weeklyHeaderBox}>
                <Text style={styles.weeklyHeaderText}>목</Text>
            </View>
            <View style={styles.weeklyHeaderBox}>
                <Text style={styles.weeklyHeaderText}>금</Text>
            </View>
            <View style={styles.weeklyHeaderBox}>
                <Text style={styles.weeklyHeaderText}>토</Text>
            </View>
            <View style={styles.weeklyHeaderBox}>
                <Text style={styles.weeklyHeaderText}>일</Text>
            </View>
        </View>
    )
}


export default function ScheduleScreen(){
    const user = React.useContext(UserContext);
    return(
      <View>
        <Text style={{fontSize:50, textAlign:"center", padding:30}}>시간표구현</Text>
  
        <Text style={{fontSize:20, textAlign:"center", padding:30}}>user:{user} 로그인됨</Text>
        <View style={styles.scrollView}>
            <ScrollView style={styles.card}>
                    <WeeklyHeader />
                    <WeeklyHeader />
                    <WeeklyHeader />
            </ScrollView>
        </View>
      </View>

    )
  }


const styles = StyleSheet.create({
    weeklyHeader:{
        flexDirection: 'row',
    },
    weeklyHeaderBox:{
        padding: 9,
        backgroundColor: 'white',
        flex:1
    },
    weeklyHeaderText:{
        textAlign: "center",
        fontWeight: "700"
    },
    scrollView:{
        height: 100
    },
    card2: {
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 25,
      borderWidth: 1,
      borderColor: "#dcdcdc",
      borderRadius: 10,
      textAlign: "center",
    },
    card: {
      margin: 25,
      borderWidth: 1,
      borderColor: "#dcdcdc",
      borderRadius: 10,
      textAlign: "center",
    },
    date: {
      margin: 5,
      color: "blue",
      fontSize: 15,
      borderColor: "black",
      textAlign: "center",
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
    },
  });