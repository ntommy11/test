import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { ApolloClient, InMemoryCache, useQuery, ApolloProvider } from "@apollo/client";
import { AuthContext, UserContext } from '../components/context';
import { SEE_REGIST_LECTURE } from '../queries';

const currentClass = {
  date: "2019년 9월 23일 월",
  time: "09:00",
  name: "금융과 핀테크",
  week: "4주차",
  type: "SC수업",
  room: "무궁관 911호"
}


const CardInfo = ({ client }) => {
  const { loading, error, data } = useQuery(SEE_REGIST_LECTURE);

  console.log("loading: ", loading);
  console.log("data: ", data);
  console.log("error:", error);
  if(data){
    console.log(data.seeRegistLecture);
    let class_list;
    
  }
  return (
    <View style={styles.card}>
      <Text style={styles.date}>{currentClass.date}</Text>
      <Text style={styles.time}>{currentClass.time}</Text>
      <Text style={styles.subject}>{currentClass.name}</Text>
      <Text style={styles.week}>{currentClass.week}</Text>
      <View style={styles.where}>
        <Text style={styles.location}> {currentClass.type} | {currentClass.room}   </Text>
      </View>
    </View>
  )
}
const CardInfo2 = () => {
  return (
    <View style={styles.card2}>
      <Text style={{ color: "#787878" }}>컴퓨터 프로그래밍 - 9월 28일 09:00 아름관</Text>
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




export default function HomeScreen() {
  const userInfo = React.useContext(UserContext);
  const client = new ApolloClient({
    uri: "http://104.208.33.91:4000/",
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${userInfo.token}`
    }
  });

  const { signOut } = React.useContext(AuthContext);
  return (
    <ApolloProvider client={client}>
      <Text style={styles.date}>[{userInfo.email}] 로 로그인됨</Text>
      <View>
        <CardInfo client={client} />
        <Text style={{ textAlign: "left", paddingLeft: 30, fontWeight: "700", paddingTop: 10 }}>다음 일정</Text>
        <CardInfo2 />
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
