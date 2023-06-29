import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";


export default function HeaderQuran() {


  const SelectedLang = useSelector((state) => state.Theme.SelectedLang)


  const navigation = useNavigation()

  const goToHome = () => {
    navigation.navigate('Home')
  }


  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Ionicons name="home-outline" size={30} color={'white'} onPress={goToHome} />
        <Text style={styles.header__textDark}>
          {SelectedLang == 'en' ? 'myQuran' : SelectedLang === 'uz' ? 'Quronim' : 'Mой коран'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:20,
    right: 0,
    left: 0,
    width: 250,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 0,
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