import React from 'react';
import { View, Text,Button } from 'react-native';

function ProfileScreen({ navigation }) {
  return (
    <View>
      <Text>This is the Profile Screen</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
    </View>
  );
}

export default ProfileScreen;
