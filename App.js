import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

const image = {uri: 'https://mediaproxy.salon.com/width/1200/https://media.salon.com/2013/12/coffee_robot.jpg'};

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <ImageBackground source={image} resizeMode="cover" style={styles.image}>
  <SafeAreaView style={styles.container}>
    <View>
      
      <Button
        title="User Report"
        onPress={() => Alert.alert('UR Button pressed')}
      />
    </View>
    <Separator />
    <View>
      
      <Button
        title="Recommendations"
        color="#f194ff"
        onPress={() => Alert.alert('Recommeneded button pressed')}
      />
    </View>
    <Separator />
    <View>
      
      <Button
        title="Usage Time"
        color="#8b008b"
        onPress={() => Alert.alert('Usage Time button pressed')}
      />
    </View>
    <Separator />
    <View>
      
      <View style={styles.fixToText}>
        <Button
          title="BACK"
          onPress={() => Alert.alert('Left button pressed')}
        />
        <Button
          title="NEXT"
          onPress={() => Alert.alert('Right button pressed')}
        />
      </View>
    </View>
  </SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;