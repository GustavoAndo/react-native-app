import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import { propsStack } from '../routes/Models';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import DocumentPicker from 'react-native-document-picker';

export const NewParty = () => {
  const navigation = useNavigation<propsStack>()

  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  async function cadastrarFesta() {
    try {
        const data = new FormData();

        file.forEach((f) => {
          data.append('file', f);
        });

        data.append('title', title);
        data.append('author', author);
        data.append('budget', budget);
        data.append('description', description);

        const response = await api.post('/party', data, {headers: {'Content-Type': 'multipart/form-data'}});

        navigation.navigate('PartyList');
    } catch (response) {
      setErrorMessage(response.data.msg);
    }
  }

  async function selecionarArquivo() {
    try {
        const data = await DocumentPicker.pick({ allowMultiSelection: true });
        setFile(data);
    } catch (err){
        if (DocumentPicker.isCancel(err)) {
            console.log('Usuario cancelou o upload', err);
        } else {
            console.log(err);
        }
    }
  }

  return (
    <View style={styles.container}>
        { !!errorMessage && <Text style={{color: "red", marginBottom: 20}}>{ errorMessage }</Text>}
        <Button title="Voltar" onPress={() => navigation.navigate('PartyList')}/>
        <Text style={styles.title}>Nova Festa</Text>
        <Text>Título: </Text>
        <TextInput style={styles.input} onChangeText={text => setTitle(text)}/>
        <Text>Autor: </Text>
        <TextInput style={styles.input} onChangeText={text => setAuthor(text)}/>
        <Text>Orçamento: </Text>
        <TextInput style={styles.input} onChangeText={text => setBudget(text)}/>
        <Text>Descrição: </Text>
        <TextInput style={styles.input} onChangeText={text => setDescription(text)}/>
        <Text>Imagem: </Text>
        <View style={styles.button}>
            <Button title="Selecione um arquivo" onPress={selecionarArquivo}/>
            {file && file.map(f => (
              <Text key={f.uri} style={{textAlign: 'center'}}>{f.name}</Text>
            ))}
        </View>
        <Button title="Cadastrar" onPress={cadastrarFesta}/>
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
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    width: 300,
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
  },
  button: {
    width: 300,
    marginTop: 10,
    marginBottom: 20,
  },
});
