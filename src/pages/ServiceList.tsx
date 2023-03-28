import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button, ScrollView} from 'react-native';
import api from '../services/api';
import { propsStack } from '../routes/Models';
import { useNavigation } from '@react-navigation/native';

export const ServiceList = () => {
  const navigation = useNavigation<propsStack>()

  const [errorMessage, setErrorMessage] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/service');

        setServices(response.data);
      } catch (response) {
        setErrorMessage(response.data.msg);
      }
    })()
  }, [])

    return (        
    <ScrollView>
      <View style={styles.container}>
        <Button title="Voltar" onPress={() => navigation.navigate('Home')}/>
        <Text style={styles.title}>Lista de Serviços:</Text>
        <Button title="Novo Serviço" onPress={() => navigation.navigate('NewService')}/>
        { !!errorMessage && <Text style={{color: "red", marginBottom: 20}}>{ errorMessage }</Text>}

        {
          services && services.map(service => (
            <View key={service._id} style={{ marginTop: 15 }}>
                <Text style={styles.name}>{service.name}</Text>
                <Text style={styles.item}>Preço: {service.price}</Text>
                {service.description && <Text style={styles.item}>Descrição: {service.description}</Text>}
            </View>
          ))
        }

      </View>
      </ScrollView>
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
