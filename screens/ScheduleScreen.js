import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { UserContext } from '../components/context';


// 학기 날짜 데이터 초기화
let dates = [];
const start = new Date(2020, 8, 1);
const end = new Date(2020, 11, 16);
for (let d = start; d < end; d.setDate(d.getDate() + 1)) {
  dates.push(new Date(d));
}

function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

const weekday = ['월', '화', '수', '목', '금', '토', '일'];

// weekly_lectures[0]: 월요일 ~ 
// weekly_lectures[6]: 일요일 
// weekly_lectures[7]: VOD
const weekly_lectures = [
  {
    name: '금융과 핀테크',
    room: '무궁관 911',
    type: 'SC',
    start_time: '19:15',
    end_time: '21:15',
  },
  {},
  {
    name: '운영체제',
    room: 'T818',
    type: 'SC',
    start_time: '19:15',
    end_time: '21:15',
  },
  {},
  {},
  [
    {
      name: '컴퓨터프로그래밍',
      room: '아름관 221',
      type: 'SC',
      start_time: '19:15',
      end_time: '21:15',
    },
    {
      name: '컴퓨터프로그래밍',
      room: '아름관 221',
      type: 'SC',
      start_time: '19:15',
      end_time: '21:15',
    },
  ],
  [],
  [
    '지형공간정보',
    '정역학'
  ],
];


const weeklist = [
  {
    name: '금융과 핀테크',
    room: '무궁관 911',
    type: 'SC',
    start_time: '19:15',
    end_time: '21:15',
  },
  {
    week: '2',
    range: '09/16~09/22'
  },
  {
    week: '3',
    range: '09/23~09/29'
  },
  {
    week: '4',
    range: '09/30~10/06'
  },
]



const Weekday = ({ day }) => {
  let name_and_room = '-';
  let type_and_time = '';
  console.log(day);
  console.log(weekly_lectures[day]);

  if (!is_empty(weekly_lectures[day])) {
    let name = weekly_lectures[day].name;
    let room = weekly_lectures[day].room;
    let type = weekly_lectures[day].type;
    let start_time = weekly_lectures[day].start_time;
    let end_time = weekly_lectures[day].end_time;

    name_and_room = `${name}/${room}`;
    type_and_time = `${type}, ${start_time}~${end_time}`;
  }
  return (
    <View style={{ flexDirection: "row" }}>
      <View>
        <Text>{weekday[day]}</Text>
      </View>
      <View>
        <Text>{name_and_room}</Text>
      </View>
      <View>
        <Text>{type_and_time}</Text>
      </View>
    </View>
  )
}

const Weekend = ({ day }) => {
  //const count = weekly_lectures.
}

function Weekly() {
  const weekdays = [0, 1, 2, 3, 4];
  return (
    <View style={styles.card}>
      {
        weekdays.map((day, index) => {
          return <Weekday key={index} day={day} />
        })
      }
    </View>
  )
}




function MonthlyHeader() {
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


export default function ScheduleScreen() {
  const user = React.useContext(UserContext);
  return (
    <View>
      <Text style={{ fontSize: 10, textAlign: "center", padding: 30 }}>시간표구현</Text>
      <Weekly />
      <Text style={{ fontSize: 20, textAlign: "center", padding: 30 }}>user:{user.email} 로그인됨</Text>
      <View style={styles.scrollView}>
        <ScrollView style={styles.card}>
          <MonthlyHeader
          />
          <MonthlyHeader
          />
          <MonthlyHeader
          />
        </ScrollView>
      </View>
    </View>

  )
}


const styles = StyleSheet.create({
  weeklyHeader: {
    flexDirection: 'row',
  },
  weeklyHeaderBox: {
    padding: 9,
    backgroundColor: 'white',
    flex: 1
  },
  weeklyHeaderText: {
    textAlign: "center",
    fontWeight: "700"
  },
  scrollView: {
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