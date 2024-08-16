import React from 'react';
import { View, Text, Button } from 'react-native';

function About({ navigation }) {
  return (
    <View>
      <Text>This is the About Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

export default About;
