import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'apisauce';

const api = create({
    baseURL: 'http://10.0.2.2:3001',
})

api.addResponseTransform(response => {
    if (!response.ok) throw response;
})

api.addAsyncRequestTransform(request => async() => {
    const token = await AsyncStorage.getItem('@partiesApp:token')

    if (token) {
        request.headers['Authorization'] = `Baerer ${token}`
    }
})

export default api;