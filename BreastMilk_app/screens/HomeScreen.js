import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const HomeScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.screen}>
            <Image source={require("../assets/Images/Logo_Short.png")} style={styles.contentImage} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register milk unit')}>
                <Text style={styles.buttonText}>Register Milk Unit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Read milk unit')}>
                <Text style={styles.buttonText}>Read Milk Unit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Modify milk unit')}>
                <Text style={styles.buttonText}>Modify Milk Unit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Stats')}>
                <Text style={styles.buttonText}>Stats</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        backgroundColor: 'lightyellow',
    },
    button: {
        backgroundColor:  "#FFED86",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#0A4158",
        textAlign: 'center',
    },
});

export default HomeScreen;
