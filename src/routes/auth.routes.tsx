import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ServiceList } from '../pages/ServiceList'
import { NewService } from '../pages/NewService'
import { propsNavigationStack } from './Models'
import { PartyList } from '../pages/PartyList'
import { Home } from '../pages/Home'
import { NewParty } from '../pages/NewParty'

const { Screen, Navigator } = createNativeStackNavigator<propsNavigationStack>()

export function AuthRoutes() {
    return (
        <Navigator initialRouteName="Home"  screenOptions={{headerShown : false}}>
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="ServiceList"
                component={ServiceList}
            />
            <Screen 
                name="NewService"
                component={NewService}
            />
            <Screen
                name="PartyList"
                component={PartyList}
            />
            <Screen
                name="NewParty"
                component={NewParty}
            />
        </Navigator>
    )
}