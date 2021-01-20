import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignInScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.text_header}>빠르게 가입하세요!</Text>
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
              <Text style={styles.text_footer}>이메일</Text>
              <View style={styles.action}>
                  <TextInput 
                      placeholder="이메일을 입력하세요"
                      style={styles.TextInput}
                      autoCapitalize="none"
                  ></TextInput>
                  <Feather name="check-circle" color="#1478FF" size={2}/>      
              </View>
              <Text style={[styles.text_footer, {marginTop:35}]}>비밀번호</Text>
              <View style={styles.action}>
                  <TextInput 
                      placeholder="비밀번호를 입력하세요"
                      style={styles.TextInput}
                      autoCapitalize="none"
                      secureTextEntry={true}
                      size={20}
                  ></TextInput>
                  <Feather name="check-circle" color="#1478FF" size={2}/>      
              </View>
              <Text style={[styles.text_footer, {marginTop:35}]}>비밀번호 확인</Text>
              <View style={styles.action}>
                  <TextInput 
                      placeholder="다시 한번 비밀번호를 입력하세요"
                      style={styles.TextInput}
                      autoCapitalize="none"
                      secureTextEntry={true}
                      size={20}
                  ></TextInput>
                  <Feather name="check-circle" color="#1478FF" size={2}/>      
              </View>
              <View style={styles.button}>
              <Button  title="신청하기" onPress={()=>{
                  alert("다시 로그인해주세요");
                  navigation.navigate('SignInScreen')}}/>
              </View>
              </Animatable.View>
        </View>
      );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#1478FF'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#1478FF',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        width: "90%",
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });