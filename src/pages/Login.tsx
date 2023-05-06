import React, { useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import { useAuth } from '../contexts/auth';

export const Login = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  async function login() {
    try {
      await signIn(email, password);
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
  }

  return (
    <View style={styles.container}>
        { !!errorMessage && <Text style={{color: "red", marginBottom: 20}}>{ errorMessage }</Text>}
        <Text>Email: </Text>
        <TextInput style={styles.input} onChangeText={text => setEmail(text)}/>
        <Text>Senha: </Text>
        <TextInput style={styles.input} onChangeText={text => setPassword(text)}/>
        <Button title="Entrar" onPress={login}/>
    </View>
  );
}

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
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    padding: 0
  }
});