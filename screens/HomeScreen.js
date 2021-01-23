import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ApolloClient, InMemoryCache, useQuery, ApolloProvider } from "@apollo/client";
import { AuthContext, UserContext } from '../components/context';
import { SEE_REGIST_LECTURE } from '../queries';
import moment from 'moment';

const now = new Date();
const TIMEZONE = now.getTimezoneOffset()*60000;

const weekday = ['일','월', '화', '수', '목', '금', '토'];

const currentClass = {
  date: "2019년 9월 23일 월",
  time: "09:00",
  name: "금융과 핀테크",
  week: "4주차",
  type: "SC수업",
  room: "무궁관 911호"
}
// 객체가 비어있는지 확인하는 함수 
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

const CardInfo = ({current_class}) => {
  console.log("current class at CardInfo: ", current_class);
  console.log("starttime:", current_class.start_time.getTime());
  // 더이상 수업이 없는 경우 처리
  if (is_empty(current_class)){
    return (
      <View style={styles.card}>
        <Text style={styles.subject}>수업이 없습니다</Text>
      </View>
    )
  }
  // 현재 수업 데이터 전처리
  let year = current_class.start_time.getFullYear();
  let month = current_class.start_time.getMonth()+1;
  let date = current_class.start_time.getDate();
  let day = weekday[current_class.start_time.getDay()];
  let hours = current_class.start_time.getHours();
  let minutes = current_class.start_time.getMinutes();
  

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{year}년 {month}월 {date}일 {day}요일</Text>
      <Text style={styles.time}>{hours>=10? hours: `0${hours}`}:{minutes >= 10? minutes: `0${minutes}`}</Text>
      <Text style={styles.subject}>{current_class.name}</Text>
      <Text style={styles.week}>{current_class.week}주차</Text>
      <View style={styles.where}>
        <Text style={styles.location}> {current_class.vod? "VOD":"SC"} | {current_class.room}   </Text>
      </View>
    </View>
  )
}
const CardInfo2 = ({next_class}) => {
  console.log("next class in CardInfo2: ", next_class);
  if (is_empty(next_class)){
    return (
      <View style={styles.card2}>
        <Text style={{ color: "#787878" }}>일정이 더이상 없습니다.</Text>
      </View>
    )
  }
  let name = next_class.name;
  let room = next_class.room;
  let month = next_class.start_time.getMonth()+1;
  let date = next_class.start_time.getDate();
  let day = weekday[next_class.start_time.getDay()];
  let hours = next_class.start_time.getHours();
  let minutes = next_class.start_time.getMinutes();
  return (
    <View style={styles.card2}>
      <Text style={{ color: "#787878" }}>{name} - {month}월 {date}일 {hours>=10? hours: `0${hours}`}:{minutes >= 10? minutes: `0${minutes}`} {room} </Text>
    </View>
  )
}

const Notification = () => {
  const userInfo = React.useContext(UserContext);
  return (
    <View style={styles.card2}>
      <TouchableOpacity style={styles.notificationList} onPress={() => alert("notification")}>
        <Text style={{ color: 'blue' }}>
          [수강철회]
        </Text>
        <Text style={{ color: "#787878" }}>2020년도 2학기 수강신청 교과목...</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationList} onPress={() => alert("notification")}>
        <Text style={{ color: 'blue' }}>
          [교내장학금]
        </Text>
        <Text style={{ color: "#787878" }}>2020년도 2학기 수강신청 교과목...</Text>
      </TouchableOpacity>
    </View>
  )
}

const Notification2 = () => {
  const userInfo = React.useContext(UserContext);
  return (
    <View style={styles.card2}>
      <TouchableOpacity style={styles.notificationList} onPress={() => alert("notification")}>
        <Text style={{ color: "#787878" }}>2020년 하반기 운영감사 시행안내</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.notificationList} onPress={() => alert("notification")}>
        <Text style={{ color: "#787878" }}>2020년도 하반기 미래융합대학 단과대학 동아리 모집</Text>
      </TouchableOpacity>
    </View>
  )
}

function Main(){
  const { signOut } = React.useContext(AuthContext);
  // 강의 정보 받기.
  const { loading, error, data } = useQuery(SEE_REGIST_LECTURE);

  console.log("loading: ",loading);
  console.log("data   : " , data);
  console.log("error  : ", error );

  if(loading){
    console.log("loading...");
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )    
  }
  if(data){
    // 데이터 전처리. 
    let lectures = data.seeRegistLecture;
    console.log("length: ", lectures.length);
    let class_list = [];
    for(let i=0; i<lectures.length; i++){
      let num_of_classes = lectures[i].classes.length;
      for(let j=0; j<num_of_classes; j++){
        let start_time = new Date(Number(lectures[i].classes[j].startTime)+TIMEZONE);
        console.log("timezone offset: ", start_time.getTimezoneOffset());
        let end_time = new Date(Number(lectures[i].classes[j].endTime)+TIMEZONE);
        let class_obj = {
          name: lectures[i].name,
          room: lectures[i].room,
          start_time: start_time,
          end_time: end_time,
          week: lectures[i].classes[j].week,
          vod: lectures[i].classes[j].VOD
        }
        class_list.push(class_obj);
      }
    }
    // 수업을 빠른 시간순으로 정렬 
    class_list.sort((a,b)=>{
      return a.start_time.getTime() - b.start_time.getTime();
    })
    console.log(class_list);
    // 현재 시간 포함 가장 가까운 수업을 찾는다.
    let current_class = 0;
    let next_class = 0;
    let now = new Date();
    for (let i=0; i<class_list.length; i++){
      if (now <= class_list[i].start_time){
        current_class = i;
        if(current_class+1 < class_list.length) next_class = i+1;
        break;
      }
    }
    console.log(now)
    console.log(class_list[current_class]);
    console.log(class_list[next_class]);
    return(
      <View>
      <CardInfo current_class={class_list[current_class]}/>
      <Text style={{ textAlign: "left", paddingLeft: 30, fontWeight: "700", paddingTop: 10 }}>다음 일정</Text>
      <CardInfo2 next_class={class_list[next_class]}/>
      <TouchableOpacity style={{ borderWidth: 1, borderColor: "black", width: 100, borderStyle: "dashed" }} onPress={() => alert("공지사항 더보기")}>
        <Text style={{ textAlign: "left", paddingLeft: 30, fontWeight: "700", paddingTop: 10 }}>공지사항</Text>
      </TouchableOpacity>
      <Notification />
      <TouchableOpacity style={{ borderWidth: 1, borderColor: "black", width: 120, borderStyle: "dashed" }} onPress={() => alert("학생회 공지사항 더보기")}>
        <Text style={{ textAlign: "left", paddingLeft: 30, fontWeight: "700", paddingTop: 10 }}>학생회 공지사항</Text>
      </TouchableOpacity>
      <Notification2 />
      <Button
        title="로그아웃"
        onPress={() => signOut()}
      />
    </View>
    )
  }
}


export default function HomeScreen() {
  const userInfo = React.useContext(UserContext);
  const client = new ApolloClient({
    uri: "http://104.208.33.91:4000/",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  });

  return (
    <ApolloProvider client={client}>
      <Text style={styles.date}>[{userInfo.email}] 로 로그인됨</Text>
      <Main />
    </ApolloProvider>
  )
}


const styles = StyleSheet.create({
  notificationTitle: {

  },
  notificationList: {
    flexDirection: "row",
    padding: 3,
  },
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
