import { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import { icons } from "@/constants";

export default function Home() {
    const mapRef = useRef<MapView>(null);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [watcher, setWatcher] = useState<Location.LocationSubscription | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Location access is needed to show your position.");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;
            setLocation({ latitude, longitude });

            mapRef.current?.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });

            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 2000,
                    distanceInterval: 5,
                },
                (loc) => {
                    const { latitude, longitude } = loc.coords;
                    setLocation({ latitude, longitude });

                    mapRef.current?.animateCamera({
                        center: { latitude, longitude },
                        pitch: 0,
                        heading: 0,
                        altitude: 1000,
                        zoom: 16,
                    });
                }
            );

            setWatcher(subscription);
        })();

        return () => watcher?.remove();
    }, []);

    const centerOnUser = () => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                500
            );
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_DEFAULT}
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                showsMyLocationButton={false}
            />

            <TouchableOpacity style={styles.customLocationButton} onPress={centerOnUser}>
                <Image source={icons.point} style={styles.locationIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    customLocationButton: {
        position: "absolute",
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    locationIcon: { width: 20, height: 20, resizeMode: "contain" },
});
