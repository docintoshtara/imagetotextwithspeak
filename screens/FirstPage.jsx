import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const FirstPage = () => {
  const [checked, setChecked] = React.useState(false);
  const navigation = useNavigation();

  const handleNextPage = () => {
    if (!checked) {
      alert("Please check the checkbox");
    } else {
        navigation.navigate('Second');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
        />
        <Text variant="labelLarge" style={styles.label}>
          Give permission to access mobile camera
        </Text>
      </View>

      <Button mode="contained" onPress={handleNextPage} style={styles.button}>
        Start
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginLeft: 8,
  },
  button: {
    marginTop: 20,
  },
});

export default FirstPage;
