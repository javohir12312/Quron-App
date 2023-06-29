import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'


export default function Cards() {

  const selector = useSelector((state) => state.Theme)

  const navigation = useNavigation()

  const goToLastReat = () => {
    navigation.navigate('LastRead')
  }

  const goToQuran = () => {
    navigation.navigate('Quran')
  }

  const goToPrayTime = () => {
    navigation.navigate('PrayTime')
  }

  const goToTasbeeh = () => {
    navigation.navigate('Tasbeeh')
  }

  const goToBookmarks = () => {
    navigation.navigate('Bookmarks')
  }



  return (
    <View style={styles.container}>
      <View style={styles.quron__img}>
        <Image style={{ width: 200, height: 200 }} source={require('../../assets/Quron.png')} />
      </View>

      <TouchableOpacity onPress={goToLastReat} style={styles.Card_last}>
        <ImageBackground style={{ flexDirection: 'row', padding: 15, paddingBottom: 20, paddingTop: 20, gap: 5, height: 130, alignItems: 'center', justifyContent: 'space-between' }} source={require('../../assets/card_last.jpg')}>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between', gap: 10 }}>
            <Text style={{ fontSize: 12, fontWeight: 500, color: 'white', opacity: 0.8 }}>Last Read</Text>
            {/* /////////////////////////////////// */}
            <Text style={styles.Card_last_text2}>Ar-Rahman</Text>
            {/* /////////////////////////////////// */}
            <TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 14, marginTop: 10, textDecorationLine: 'underline', textDecorationColor: 'blue' }}>
                {'Go to > '}
              </Text>
            </TouchableOpacity>
          </View>

          <Image style={{ width: 100, height: 100, marginTop: -30 }} source={require('../../assets/chiroq.png')} />
        </ImageBackground>
      </TouchableOpacity>





      <View style={styles.Box}>
        <View style={{ width: "50%", gap: 20, margin: 0 }}>
          <TouchableOpacity onPress={goToQuran} style={styles.box1}>
            <ImageBackground style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-around' }} source={require('../../assets/bookmark_bg.jpg')}>
              <Image style={{ width: 60, height: 60, margin: 10 }} source={require('../../assets/quran.png')} />

              <Text style={{ fontSize: 20, margin: 15, color: 'white', fontWeight: 700, fontStyle: 'italic' }}>
                Quran
              </Text>


              <Text style={{ marginLeft: 20, marginBottom: 10, color: 'white' }}>
                {'Go to > '}
              </Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToTasbeeh} style={styles.box2}>
            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/tasbeh_bg.jpg')}>
              <Image style={{ width: 50, height: 50, marginLeft: 20, marginTop: 10 }} source={require('../../assets/beads.png')} />


              <Text style={{ fontSize: 20, margin: 15, color: 'white', fontWeight: 700, fontStyle: 'italic' }}>
                Tasbeeh
              </Text>

              <Text style={{ marginLeft: 20, marginTop: -10, color: 'white' }}>
                {'Go to > '}
              </Text>

            </ImageBackground>
          </TouchableOpacity>
        </View>


        <View style={{ width: "50%", gap: 20, margin: 0, flexDirection: 'column-reverse' }}>
          <TouchableOpacity onPress={goToBookmarks} style={styles.box1}>
            <ImageBackground style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} source={require('../../assets/Quran_bg.jpg')}>
              <Image style={{ width: 50, height: 50, position: 'absolute', top: 0, left: 0 }} source={require('../../assets/bookmarks.png')} />
              <Text style={{ width: '100%', fontSize: 18, color: 'white', fontWeight: 700, fontStyle: 'italic', textAlign: 'center', marginTop: 0, elevation: 100, shadowColor: 'red', flexDirection: 'row', width: "100%" }}>
                Bookmarks
                <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={require('../../assets/shopping-basket.png')} />
              </Text>


            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToPrayTime} style={styles.box2}>
            <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/ping_bg.jpg')}>
              <Image style={{ width: 50, height: 50, margin: 10 }} source={require('../../assets/moon.png')} />

              <Text style={{ fontSize: 20, margin: 15, color: 'white', fontWeight: 700, fontStyle: 'italic', marginTop: 0, textAlign: 'right', elevation: 100, shadowColor: 'red' }}>
                Pray Time
              </Text>

              <Text style={{ marginRight: 20, paddingBottom: 20, color: 'white', textAlign: 'right' }}>
                {'Go to > '}
              </Text>

            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>



    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  quron__img: {
    width: 200,
    height: 200,
    shadowColor: 'red',
    shadowRadius: 55,
    borderRadius: 55,
    elevation: 80
  },
  Card_last: {
    width: '90%',
    overflow: 'hidden',
    borderRadius: 20,
    shadowColor: 'gray',
    elevation: 90,
    shadowRadius: 55
  },
  Card_last_text2: {
    fontSize: 22, color: 'white'
  },
  Box: {
    width: '80%',
    height: 'auto',
    flexDirection: 'row',
    gap: 20,
    marginTop: 40,
    alignItems: 'center',
    marginLeft: -25,
    justifyContent: 'space-between',
  },
  box1: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    overflow: 'hidden'
  },
  box2: {
    width: "100%",
    height: 130,
    borderRadius: 20,
    overflow: 'hidden'
  }
})