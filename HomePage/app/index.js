import { StyleSheet, Text, View, Image, FlatList, Pressable } from "react-native";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import right from '../assets/images/right.png';
import menuOptions from "../assets/menuOptions";
import { Link } from "expo-router";
const MenuOption = () => {
  return
}
export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
        <Text style={styles.title}>Posture</Text>
        </View>
        <FontAwesome5 name="user-circle" size={30} color="#eee" />
      </View>
      <Image source={right} style={styles.image} resizeMode="contain"/>

      <View style={styles.controls}>
  <AntDesign name="pause" size={24} color="#eee" />
  <AntDesign name="play" size={24} color="#eee" />
  <Ionicons name="settings" size={24} color="#eee" />
  <MaterialCommunityIcons name="arrow-u-right-top-bold" size={24} color="#eee" />
</View>

<FlatList
  data={menuOptions}
  renderItem={({item}) => (
    <Link href={item.href} asChild>
  <Pressable style={styles.optionRow}>
  {/* ICON */}
  <MaterialCommunityIcons name={item.iconName} size={26} color="#eee"/>
  {/* TEXT */}
  <Text style={styles.optionText}>{item.name}</Text>
  {/* ICON */}
  <MaterialIcons
    name="keyboard-arrow-right"
    size={24}
    color="#eee"
    style={{ marginLeft: 'auto' }}
  />
  </Pressable>
  </Link>
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#161818',
  },
  header: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent:"space-between"
  },

  title: {
    fontSize: 24,
    color: '#eee',
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#38434D",
    fontWeight: '500',
  },
  image:{
    width: '100%',
    height: 300,

  },
  controls:{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginVertical:20,
  },
  optionRow:{
    flexDirection:'row',
    marginVertical:20,
    alignItems:'center',
  },
  optionText:{
    color:'#eee',
    fontSize:18,
    fontWeight:'bold',
    marginLeft:10,

  },
});
