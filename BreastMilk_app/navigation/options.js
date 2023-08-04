import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

export const navOptions = (nav) => {
    return {
        headerTintColor: '#2d2d2d',
        headerStyle: {
            backgroundColor: 'lightyellow',
            alignItems: 'flex-end', 
            justifyContent: 'space-between', 
        },
        headerRight: () => (
            <Ionicons
                name = 'menu'
                size= {32}
                color = 'black'
                onPress={()=>nav.toggleDrawer()}
            />
        ),
        headerLeft: () => (
            <Text style={{color:'black', fontSize: 30, paddingLeft: 5}}>Logo</Text>
        )
    }
}