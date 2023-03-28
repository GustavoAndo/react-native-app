import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import { propsStack } from '../routes/Models';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';

export const NewService = () => {
  const navigation = useNavigation<propsStack>()

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  async function cadastrarServico() {
    try {
      const response = await api.post('/service', {
        name, price, description,
      });
      
      navigation.navigate("ServiceList")
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
  }

  return (
    <View style={styles.container}>
        { !!errorMessage && <Text style={{color: "red", marginBottom: 20}}>{ errorMessage }</Text>}
        <Button title="Voltar" onPress={() => navigation.navigate("ServiceList")}/>
        <Text style={styles.title}>Novo Serviço</Text>
        <Text>Nome: </Text>
        <TextInput style={styles.input} onChangeText={text => setName(text)}/>
        <Text>Preço: </Text>
        <TextInput style={styles.input} onChangeText={text => setPrice(text)}/>
        <Text>Descrição: </Text>
        <TextInput style={styles.input} onChangeText={text => setDescription(text)}/>
        <Button title="Cadastrar" onPress={cadastrarServico}/>
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