import {NativeStackNavigationProp} from '@react-navigation/native-stack'


export type propsNavigationStack = {
    ServiceList: undefined,
    NewService: undefined,
    PartyList: undefined,
    NewParty: undefined,
    Home: undefined,
    PartyDetails: undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>