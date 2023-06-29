import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { ChangeLanguages, changeMode, closeHamburger } from '../../slice';
import Header from '../Header/Header';
import Cards from '../Cards/Cards';
import { Picker } from '@react-native-picker/picker';

export default function Home() {
  const selector = useSelector((state) => state.Theme.mode);
  const hamburger = useSelector((state) => state.Theme.hamburger);
  const languages = useSelector(state => state.Theme.languages);
  const dispatch = useDispatch();
  const SelectedLang = useSelector((state) => state.Theme.SelectedLang);
  const menuAnim = useRef(new Animated.Value(-220)).current;
  const [changeValueLang, setchangeValueLang] = useState('en');

  const ChangeLang = useCallback(() => {
    dispatch(ChangeLanguages(changeValueLang));
  }, [dispatch, changeValueLang]);

  useEffect(() => {
    ChangeLang();
  }, [ChangeLang, changeValueLang]);

  const CloseMenu = useCallback(() => {
    dispatch(closeHamburger());
  }, [dispatch]);

  const toggleSwitch = useCallback(() => {
    dispatch(changeMode());
  }, [dispatch]);

  useEffect(() => {
    if (hamburger) {
      Animated.timing(menuAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(menuAnim, {
        toValue: -220,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [hamburger]);

  return (

    <View style={selector ? styles.containerDark : styles.container}>
      <StatusBar style="auto" />
      <Header />
      <Cards />
      <Animated.View
        style={[
          styles.hamburger,
          { transform: [{ translateX: menuAnim }] },
        ]}
      >
        <View style={[hamburger == true ? styles.hamburger : styles.hamburgerDef, selector ? { backgroundColor: '#27374D' } : { backgroundColor: 'white' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>
            <Text style={[{ padding: 20, paddingLeft: 10, }, selector ? { color: 'white' } : { color: 'black' }]}>
              Menu
            </Text>

            <TouchableOpacity onPress={CloseMenu} style={{ paddingLeft: 20, paddingTop: 20, paddingBottom: 20 }}>
              <Feather name="x" size={24} color={selector ? 'white' : "black"} />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10 }}>
            <Text style={[selector ? { color: 'white' } : { color: 'black' }]}>
              Dakr mode
            </Text>

            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={hamburger ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={selector}
            />
          </View>

          <View >
            <Picker
              selectedValue={changeValueLang}
              style={{ height: 50, width: 150 }}
              onValueChange={item => setchangeValueLang(item)}
            >
              <Picker.Item label={languages.en.language} value="en" />
              <Picker.Item label={languages.uz.language} value="uz" />
              <Picker.Item label={languages.ru.language} value="ru" />
            </Picker>

          </View>
        </View>
      </Animated.View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    // backgroundColor:'rgba(94,194,119,0.3)',
    // backgroundColor:"#68EDCB"
    backgroundColor: "rgba(128,255,128,0.4)"
  },
  containerDark: {
    backgroundColor: '#27374D',
    flex: 1,
    position: 'relative',
  },
  hamburgerDef: {
    flex: 1,
    position: 'absolute',
    width: 220,
    height: '100%',
    backgroundColor: 'white',
    top: '-100%',
    right: '-100%',
    elevation: 100,
    transition: '0.3s'
  },
  hamburger: {
    flex: 1,
    position: 'absolute',
    width: 220,
    height: '100%',
    backgroundColor: 'white',
    top: 0,
    elevation: 100,
    paddingTop: 30,
    transition: '0.3s'
  }
})