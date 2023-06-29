import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo, Feather, Foundation, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import instance from '../../server';
import { PlayIs, enterSura } from '../../slice';

export default function Sura() {
  const dispatch = useDispatch();

  const id = useSelector(state => state.Theme.sura);
  const language = useSelector(state => state.Theme.SelectedLang);

  const [data, setData] = useState(null);
  const [ayahs, setAyahs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [soundObject, setSoundObject] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);

  useEffect(() => {
    const fetchSura = async () => {
      try {
        const response = await instance.get(`/${id}`);
        const audioResponse = await instance.get(`${id}/ar.alafasy`);
        setAudio(audioResponse.data.data.ayahs);
        setData(response.data.data);
        setAyahs(response.data.data.ayahs);
        console.log("response");
        console.log(response);
        console.log("audioResponse");
        console.log(audioResponse);
      } catch (error) {
        console.log('Error fetching sura: ', error);
      }
    };

    fetchSura();
  }, [id]);

  const playSura = async (index) => {
    console.log(index);
    try {
      if (index !== null) {
        if (soundObject) {
          await soundObject.stopAsync();
          await soundObject.unloadAsync();
        }
        setCurrentAudioIndex(index)

        const audioUrl = audio[index - 1].audio;
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioUrl },
          { shouldPlay: true }
        );

        newSound.setOnPlaybackStatusUpdate((playbackStatus) => {
          if (playbackStatus.didJustFinish) {
            const nextIndex = index + 1;
            if (nextIndex < ayahs.length) {
              playSura(nextIndex);
            }
          }
        });

        setSoundObject(newSound);
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error playing sound: ', error);
    }
  };

  const pauseSound = async () => {
    try {
      if (soundObject) {
        await soundObject.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.log('Error pausing sound: ', error);
    }
  };

  const resumeSound = async () => {
    try {
      if (soundObject) {
        setIsPlaying(true)
        await soundObject.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Error resuming sound: ', error);
    }
  };

  useEffect(() => {
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, [soundObject]);

  return (
    <View style={styles.container}>
      <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../assets/Quran_page_bg.jpg')}>
        <View style={{ padding: 20, marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Ionicons name="chevron-back" size={30} color="white" />
          <View style={styles.view}>
            <TextInput style={styles.input} placeholder="Search" />
            <Ionicons style={styles.searchIcon} name="search" size={24} color="gray" />
          </View>
        </View>

        {data && (
          <View style={{ width: '90%', height: '25%', borderRadius: 50, overflow: 'hidden', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', margin: 20 }}>
            <ImageBackground style={{ width: '100%', height: '100%', borderRadius: 50 }} source={require('../../assets/Sura_bg_top1.jpg')}>
              <View style={styles.number_outlines}>
                <View style={styles.borderBox}></View>
                <Text style={styles.surahsNumber}>{data.number}</Text>
              </View>
              <Text style={{ color: 'white', marginTop: 15, left: 35, fontSize: 22, fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                {data.englishName}
              </Text>
              <Text style={{ color: 'white', textAlign: 'center', width: '50%', fontWeight: '200', marginTop: 5 }}>
                {data.revelationType}
              </Text>
              <Text style={{ color: 'white', textAlign: 'center', width: '50%', fontWeight: '200', marginTop: 5, marginTop: 20 }}>
                {data.numberOfAyahs} {language === 'uz' ? '-sura' : language === 'ru' ? '-сура' : '-surahs'}
              </Text>
            </ImageBackground>
          </View>
        )}

        <SafeAreaView style={styles.surahsShow}>
          <ScrollView>
            {ayahs.map((item) => (
              <View key={item.number} style={{ marginTop: 10 }}>
                <View>
                  <Text style={{ color: 'white', textAlign: 'center', fontSize: 22, fontWeight: 'bold', fontStyle: 'italic' }}>
                    {item.text}
                  </Text>
                </View>

                <TouchableOpacity id={item.number} style={{ padding: 20, position: 'relative', paddingTop: 0 }}>
                  <ImageBackground source={require('../../assets/Card_bg_quran.jpg')} style={styles.backgroundCard}>
                    <View style={styles.numberOutlinesBt}>
                      <View style={styles.borderBox}></View>
                      <Text style={styles.surahsNumber}>{item.number}</Text>
                    </View>
                    <View>
                      {currentAudioIndex === item.number ? (
                        isPlaying ? (
                          <Foundation name="pause" size={30} color="white" onPress={() => pauseSound()} />
                        ) : (
                          <Feather name="play" size={30} color="white" onPress={() => resumeSound()} />
                        )
                      ) : (
                        <Feather name="play" size={30} color="white" onPress={() => playSura(item.number)} />
                      )}
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  borderBox: {
    borderWidth: 2,
    borderColor: 'green',
    position: 'absolute',
    top: -2,
    left: -2,
    width: 40,
    height: 40,
    borderColor: 'rgb(66,112,116)',
    borderWidth: 2,
    transform: [{ rotate: '-45deg' }],
  },
  backgroundCard: {
    overflow: 'hidden',
    padding: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  input: {
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
  },
  searchIcon: {
    position: 'absolute',
    top: '25%',
    right: 15,
  },
  surahsShow: {
    position: 'absolute',
    height: '60%',
    width: '100%',
    overflow: 'scroll',
    top: '40%',
  },
  surahsNumber: {
    textAlign: 'center',
    transform: [{ rotate: '-45deg' }],
    color: 'white',
  },
  number_outlines: {
    marginLeft: 70,
    marginTop: 25,
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(66, 112, 116)',
    borderWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
  numberOutlinesBt: {
    marginLeft: -10,
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(66,112,116)',
    borderWidth: 2,
    transform: 'rotate(45deg)',
  },
});
