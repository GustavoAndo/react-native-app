import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../pages/Login'
import { propsNavigationStack } from './Models'

const { Screen, Navigator } = createNativeStackNavigator<propsNavigationStack>()

export function AppRoutes() {
    return (
        <Navigator initialRouteName="Login"  screenOptions={{headerShown : false}}>
            <Screen
                name="Login"
                component={Login}
            />
        </Navigator>
    )
}