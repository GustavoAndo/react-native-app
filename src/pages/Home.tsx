import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { propsStack } from '../routes/Models';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/auth';

export const Home = () => {
  const navigation = useNavigation<propsStack>();
  const { signOut, user } = useAuth();

  function sair() {
    signOut();
  }

  return (
    <View style={styles.container}>
        <Text>Olá, {user.name}</Text>
        <Text style={styles.title}>Menu</Text>
        <View style={styles.button}>
            <Button title="Lista de Festas" onPress={() => navigation.navigate('PartyList')}/>
        </View>
        <View style={styles.button}>
            <Button title="Lista de Serviços" onPress={() => navigation.navigate('ServiceList')}/>
        </View>
        <View style={styles.button}>
            <Button title="Sair" onPress={sair}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  button: {
    marginTop: 15,
  },
});
