import {
  Dimensions, StyleSheet, Text, TextInput, View, ActivityIndicator, ScrollView, ImageBackground, Keyboard
} from "react-native";
import HeaderQuran from "../HeaderQuran/HeaderQuran";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import axiosinstance from "../../server";
import { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { enterSura } from "../../slice";
import { useNavigation } from "@react-navigation/native";

export default function Quran() {

  const SelectedLang = useSelector((state) => state.Theme.SelectedLang);
  const [data, setData] = useState([])
  const [keyboard, setKeyboard] = useState(false)
  const dispatch = useDispatch()

  const navigation = useNavigation()


  const gotoSura = () => {
    navigation.navigate('Sura')
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const rest = await axiosinstance.get("");
        setData(rest.data.data)
        console.log(rest);
        console.log('data');
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // listen when keyboard close
  Keyboard.addListener('keyboardDidShow', () => {
    setKeyboard(true)
  });

  // listen when keyboard close
  Keyboard.addListener('keyboardDidHide', () => {
    setKeyboard(false)

  });

  function Enter(event) {
    console.log(event);
    dispatch(enterSura(event))
    gotoSura()
  }

  // const stopSound = async () => {
  //   try {
  //     if (soundObject) {
  //       await soundObject.stopAsync();
  //       await soundObject.unloadAsync();
  //       dispatch(PlayIs(null));
  //       setIdSura(null);
  //     }
  //   } catch (error) {
  //     console.log('Error stopping sound: ', error);
  //   }
  // };

  // stopSound()

  return (
    < >
      <View style={styles.container}>

        <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/Quran_page_bg.jpg')}>
          <HeaderQuran />

          <View style={styles.box}>

            <Text style={styles.surahs_text}>
              {SelectedLang == 'en' ? 'Surah' : SelectedLang === 'uz' ? 'Suralar' : 'Cура'}
            </Text>

            <View style={styles.view}>
              <TextInput style={styles.input} placeholder="Search" />
              <Ionicons style={styles.searchIcon} name="search" size={24} color={'gray'} />
            </View>

          </View>

          <SafeAreaView style={keyboard ? styles.surahsShow : styles.surahs}>
            <ScrollView>
              {data.length > 0 || data.length === undefined ?
                data.map(item => {
                  return (
                    <TouchableOpacity onPress={() => Enter(item.number)} id={item.number} key={item.number} style={{ padding: 20, position: 'relative' }}>
                      <ImageBackground source={require('../../assets/Card_bg_quran.jpg')} style={styles.Background_card}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 15, position: 'relative' }}>


                          <View style={styles.number_outlines} source={require('../../assets/frame1.png')} >
                            <View style={styles.borderBOx}>

                            </View>
                            <Text style={styles.surahs__number}>
                              {item.number}
                            </Text>
                          </View>

                          <View style={{ flexDirection: "column", gap: 10 }}>
                            <Text style={{
                              fontWeight: 700, fontSize: 20, color: 'white'
                            }}>
                              {item.englishName}
                            </Text>

                            <Text style={{ color: "gray", fontWeight: 500, fontSize: 12 }}>
                              {item.revelationType} -  {item.numberOfAyahs} - Versees
                            </Text>
                          </View>

                        </View>
                        <Text style={{ fontStyle: 'italic', fontWeight: 700, fontSize: 18, color: 'white' }}>
                          {item.name}
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  )
                }) :
                <View style={[styles.horizontal]}>
                  <ActivityIndicator size="large" color="white" />
                </View>}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground >
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: Dimensions.get('window').height - (Dimensions.get('window').height / 100) * 40,
  },
  borderBOx: {
    borderWidth: 2,
    borderColor: 'green',
    position: 'absolute',
    top: -2,
    left: -2,
    width: 40, height: 40, borderColor: 'rgb(66,112,116)', borderWidth: 2, transform: 'rotate(-45deg)',
  },
  box: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    top: 100,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: Dimensions.get('window').width - 50,
    marginTop: 20,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingRight: 20,
    paddingLeft: 20
  },
  searchIcon: {
    position: 'absolute',
    top: '45%',
    right: 15
  },
  surahs: {
    position: 'absolute',
    height: '82%',
    width: '100%',
    overflow: 'scroll',
    top: '20%',
  }, surahsShow: {
    position: 'absolute',
    height: '72%',
    width: '100%',
    overflow: 'scroll',
    top: '40%',
  },
  surahs__number: {
    textAlign: 'center',
    transform: 'rotate(-45deg)',
    color: 'white',
  },
  Background_card: {
    overflow: 'hidden', padding: 25, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative'
  },
  surahs_text: {
    fontSize: 16, paddingBottom: 3, paddingRight: 15, paddingLeft: 15, borderColor: 'white', borderRightWidth: 3, borderLeftWidth: 3, borderRadius: 12, shadowColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, color: 'white', fontWeight: '700', fontStyle: 'italic'
  },
  number_outlines: {
    marginLeft: -10, width: 40, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'rgb(66,112,116)', borderWidth: 2, transform: 'rotate(45deg)'
  }
});
