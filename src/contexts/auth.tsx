import { createContext, useState, useEffect, useContext } from 'react'
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextData {
    signed: boolean;
    user: object | null;
    signIn(email: string, password: string): Promise<void>,
    signOut(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const storageUser = await AsyncStorage.getItem("@partiesApp:user")
            const storageToken = await AsyncStorage.getItem("@partiesApp:token")

            if (storageUser && storageToken) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
        })()
    }, [])

    async function signIn(email: string, password: string) {
        const response = await api.post('/login', {
            email, password
        });

        setUser(response.data.user)

        await AsyncStorage.setItem('@partiesApp:user', JSON.stringify(response.data.user))
        await AsyncStorage.setItem('@partiesApp:token', response.data.token)
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    return (
    <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, loading}}>
        {children}
    </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
};