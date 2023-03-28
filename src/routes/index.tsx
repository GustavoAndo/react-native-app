import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/auth';

export function Routes() {
    const { signed, loading } = useAuth();

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#666"/>
            </View>
        )
    }

    return (
        <NavigationContainer>
            {signed ? <AuthRoutes /> : <AppRoutes />}
        </NavigationContainer>
    )
}