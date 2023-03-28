import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import api from '../services/api';
import { propsStack } from '../routes/Models';
import { useNavigation } from '@react-navigation/native';

export const PartyList = () => {
  const navigation = useNavigation<propsStack>()

  const [errorMessage, setErrorMessage] = useState(null);
  const [parties, setParties] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/party');

        setParties(response.data);
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    })();
  }, []);

    return (
      <View style={styles.container}>
        <Button title="Voltar" onPress={() => navigation.navigate('Home')}/>
        <Text style={styles.title}>Lista de Festas:</Text>
        <Button title="Nova Festa" onPress={() => navigation.navigate('NewParty')}/>
        { !!errorMessage && <Text style={{color: "red", marginBottom: 20}}>{ errorMessage }</Text>}
        {
          parties && parties.map(party => (
            <View key={party._id} style={{ marginTop: 15 }}>
                <Text style={styles.name}>{party.title}</Text>
                <Text style={styles.item}>Preço: {party.author}</Text>
                <Text style={styles.item}>Preço: {party.budget}</Text>
                {party.description && <Text style={styles.item}>Descrição: {party.description}</Text>}
            </View>
          ))
        }
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
    marginBottom: 15,
    marginTop: 15,
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    textAlign: 'center',
  },
});
