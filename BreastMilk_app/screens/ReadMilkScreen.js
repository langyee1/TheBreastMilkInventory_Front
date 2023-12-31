import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {HeaderBackButton} from "@react-navigation/elements";

const ReadMilkScreen = () => {
    const [unitId, setUnitId] = useState("");
    const [milkData, setMilkData] = useState(null);
    const navigation = useNavigation()
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Fetch Milk Unit Data',
            headerTitleStyle: {
                fontFamily: 'Verdana',
            },
            headerLeft: () => (
                <HeaderBackButton label="chevron-back" tintColor="#0A4158"  onPress={() => navigation.goBack()} />
            )
        })
    })
    const fetchMilkData = async () => {
        try {
        const response = await axios.get(`https://milkbuddy.onrender.com/milks/${unitId}`);

        if (response.status === 200) {
            setMilkData(response.data);
        } else {
            Alert.alert("Error", "Failed to fetch milk data.");
        }
        } catch (error) {
        Alert.alert("Error", "An error occurred while fetching milk data.");
        }
    };

    const handleFetchData = () => {
        if (unitId.trim() === "") {
        Alert.alert("Error", "Please enter a valid unit ID.");
        return;
        }

        fetchMilkData();
    };

    const calculateExpiration = () => {
        if (!milkData || !milkData.timestamp || !milkData.container) return "N/A";

        const timestamp = new Date(milkData.timestamp);
        const now = new Date();

        switch (milkData.container.toLowerCase()) {
            case "freezer":
                timestamp.setMonth(timestamp.getMonth() + 6);
                return now > timestamp ? "Milk unit expired" : `${Math.ceil((timestamp - now) / (1000 * 60 * 60 * 24))} days left`;
            case "countertop":
                timestamp.setHours(timestamp.getHours() + 3);
                return now > timestamp ? "Milk unit expired" : `${Math.ceil((timestamp - now) / (1000 * 60 * 60))} hours left`;
            case "refrigerator":
                timestamp.setHours(timestamp.getHours() + 48);
                return now > timestamp ? "Milk unit expired" : `${Math.ceil((timestamp - now) / (1000 * 60 * 60))} hours left`;
            default:
                return "N/A";
        }
    };

    return (
        <View style={styles.screen}>
        <TextInput
            style={styles.input}
            value={unitId}
            onChangeText={(text) => setUnitId(text)}
            placeholder="Enter Unit ID"
        />
        <TouchableOpacity style={styles.button} onPress={handleFetchData}>
            <Text style={styles.buttonText}>Get Milk Information</Text>
        </TouchableOpacity>

        {milkData && (
            <View>
            <Text style={styles.responseText}>Unit ID: {milkData.id}</Text>
            <Text style={styles.responseText}>Timestamp: {milkData.timestamp}</Text>
            <Text style={styles.responseText}>Container: {milkData.container}</Text>
            <Text style={styles.responseText}>Type: {milkData.type}</Text>
            <Text style={styles.responseText}>Expires: {calculateExpiration()}</Text>
            </View>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
        screen: {
            padding: 20,
            backgroundColor: "lightyellow",
        },
        input: {
            borderWidth: 1,
            borderColor: "#C89DD8",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            fontFamily: 'Verdana',
            fontSize: 16,
        },
        button: {
            backgroundColor: "#FFED86",
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
        },
        buttonText: {
            fontSize: 16,
            fontFamily: "Verdana",
            color: "#0A4158",
            textAlign: "center",
        },
        responseText: {
            fontSize: 16,
            fontFamily: "Verdana",
            color: "#0A4158",
        },
    });

export default ReadMilkScreen;
