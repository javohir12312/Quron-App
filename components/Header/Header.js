import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openHamburger } from '../../slice';

export default function Header() {
  const selector = useSelector((state) => state.Theme.mode)

  const hamburger = useSelector((state) => state.Theme.hamburger)
  const SelectedLang = useSelector((state) => state.Theme.SelectedLang)
  const language = useSelector((state) => state.Theme.languages)

  const dispatch = useDispatch()


  const handlePress = () => {
    dispatch(openHamburger()); // Dispatch the relevant action
  };
  return (
    <View style={styles.container}>
      <Entypo name="menu" size={30} color={selector ? 'white' : "black"} onPress={() => handlePress()} />
      <Text style={selector ? styles.header__textDark : styles.header__text}>
        {SelectedLang == 'en' ? 'myQuran' : SelectedLang === 'uz' ? 'Quronim' : 'Mой коран'}
      </Text>

      <TouchableOpacity>
        <Ionicons name="md-person-circle-outline" size={30} color={selector ? 'white' : "black"} />
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    top: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  header__text: {
    fontWeight: 700,
    color: 'rgba(44,93,99,1)',
    fontSize: 23
  },
  header__textDark: {
    fontWeight: 700,
    color: '#DDE6ED',
    fontSize: 23
  }
})