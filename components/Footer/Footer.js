import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Footer = () => {

  // const navigation = useNavigation();

  const GoToOutput = () => {
    // navigation.navigate('Output');
    handleButtonPress(1)
  };

  const GoToInput = () => {
    // navigation.navigate('Input');
    handleButtonPress(2)
  };

  const GoToHome = () => {
    // navigation.navigate('Home');
    handleButtonPress(3)
  };

  const GoToHistory = () => {
    // navigation.navigate('Info');
    handleButtonPress(4)
  };

  const GoToProfile = () => {
    // navigation.navigate('Profile');
    handleButtonPress(5)
  };


  const [activeButton, setActiveButton] = useState(3);

  const handleButtonPress = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <View style={style.container}>
      <View style={style.box}>
        <TouchableOpacity style={[style.box1, activeButton === 1 && style.activeButton]} onPress={GoToOutput} >
          <AntDesign name="shoppingcart" size={30} color={activeButton === 1 ? 'white' : 'gray'} onPress={GoToOutput} />
        </TouchableOpacity>
        <TouchableOpacity style={[style.box2, activeButton === 2 && style.activeButton]} onPress={GoToInput} >
          <AntDesign name="creditcard" size={30} color={activeButton === 2 ? 'white' : 'gray'} onPress={GoToInput} />
        </TouchableOpacity>
        <TouchableOpacity style={[style.box3, activeButton === 3 && style.activeButton]} onPress={GoToHome} >
          <MaterialCommunityIcons name="home-outline" size={30} color={activeButton === 3 ? 'white' : 'gray'} onPress={GoToHome} />
        </TouchableOpacity>
        <TouchableOpacity style={[style.box4, activeButton === 4 && style.activeButton]} onPress={GoToHistory} >
          <MaterialIcons name="history" size={30} color={activeButton === 4 ? 'white' : 'gray'} onPress={GoToHistory} />
        </TouchableOpacity>
        <TouchableOpacity style={[style.box5, activeButton === 5 && style.activeButton]} onPress={GoToProfile} >
          <Ionicons name="ios-person-outline" size={30} color={activeButton === 5 ? 'white' : 'gray'} onPress={GoToProfile} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const style = StyleSheet.create({

  container: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    position:"absolute",
    bottom:0
  },
  activeButton: {
    transform: [{ translateY: -25 }],
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EB7BC0',
    elevation:10,
    shadowColor: 'red',
    shadowOffset: { width: 10, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  box: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#F8FCFF',
    padding: 3
  },
  box1: {
    width: 60, height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    width: 60, height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box4: {
    width: 60, height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box5: {
    width: 60, height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

})
export default Footer;