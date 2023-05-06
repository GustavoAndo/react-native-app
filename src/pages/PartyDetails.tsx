import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity, Alert, PermissionsAndroid, Platform, Image} from 'react-native';
import api from '../services/api';
import { propsStack } from '../routes/Models';
import { useNavigation } from '@react-navigation/native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

export const PartyDetails = ({route}) => {
    const navigation = useNavigation<propsStack>()
    const [errorMessage, setErrorMessage] = useState(null);
    const [party, setParty] = useState([]);
    
    const checkPermission = async() => {
        if (Platform.OS === 'ios') {
            downloadImage();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Permissão do armazenamento requerida',
                    message: 'O aplicativo precisa acessar seu armazenamento para baixar arquivos'
                })
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    downloadImage();
                } else {
                    Alert.alert('Permissão de Armazenamento não concedido');
                }
            } catch (error) {
                console.warn(error);
            }
        }
    }

    const downloadImage = async() => {
        try {
            // const response = await api.get('/party/download/642722eaeda6f4eb1a078181', {}, {responseType: 'blob'});
            // const IMAGE_PATH = response.data;
            const IMAGE_PATH = 'http://10.0.2.2:3001/party/download/SSH.txt';

            let date = new Date();
            let image_url = IMAGE_PATH;
            var ext = getExtention(image_url);
            ext = "." + ext[0];
            const {config, fs} = RNFetchBlob;
            let PictureDir = fs.dirs.PictureDir;
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: PictureDir + '/image_' + Math.floor(date.getTime() + date.getSeconds()/2) + ext,
                    description: 'Image'
                }
            }
            config(options)
            .fetch('GET', image_url)
            .then(res => {
                Alert.alert('Imagem baixada com sucesso');
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getExtention = filename => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    useEffect(() => {
    (async () => {
        try {
            const { id } = route.params;

            const response = await api.get('/party/' + id);

            setParty(response.data);
        } catch (response) {
            setErrorMessage(response.data.msg);
        }
    })();
    }, []);

    // async function download(id: string) {
    //     console.log('entrou')
    //     ReactNativeBlobUtil.fetch('GET', 'http://10.0.2.2:3001/party/download/' + id, {
    //         // Authorization: `Baerer ${await AsyncStorage.getItem('@partiesApp:token')}`,
    //     }).then((res) => {
    //         let status = res.info().status;

    //         if (status == 200) {
    //             console.log("baixou!")
    //         }
    //         else {
    //             setErrorMessage(res.data.msg);
    //         }
    //     })
    //     .catch((errorMessage, statusCode) => {
    //         console.log(errorMessage)
    //     })
    // }

    return (
        <View style={styles.container}>
        <Button title="Voltar" onPress={() => navigation.navigate('PartyList')}/>
        <Text style={styles.title}>Detalhes da Festa:</Text>
        { !!errorMessage && <Text style={{color: "red", marginBottom: 20}}>{ errorMessage }</Text>}
            <View style={{ marginTop: 15 }}>
                {/* <Image source={'http:/party/download/642722eaeda6f4eb1a078181'}/> */}
                <Text style={styles.name}>Título: {party.title}</Text>
                <Text style={styles.item}>Autor: {party.author}</Text>
                <Text style={styles.item}>Orçamento: {party.budget}</Text>
                {party.description && <Text style={styles.item}>Descrição: {party.description}</Text>}
                <Text style={styles.name}>Arquivos: </Text>
                {party.images && party.images.map(file => (
                    <TouchableOpacity key={file._id} onPress={checkPermission}><Text style={styles.item}>{file.filename}</Text></TouchableOpacity>
                ))}
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
