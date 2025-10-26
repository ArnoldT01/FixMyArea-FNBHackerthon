import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useRef, useState, useMemo } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { icons } from "@/constants";
import IssueViewCard from "@/components/IssueViewCard";
import { useRouter } from "expo-router";

export default function Home() {
    const mapRef = useRef<MapView>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [watcher, setWatcher] = useState<Location.LocationSubscription | null>(null);

    const router = useRouter();

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
                }
            );

            setWatcher(subscription);
        })();

        return () => watcher?.remove();
    }, []);

    const centerOnUser = () => {
        if (location && mapRef.current) {
            const adjustedLatitude = location.latitude - 0.004;

            mapRef.current.animateToRegion(
                {
                    latitude: adjustedLatitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                },
                500
            );
        }
    };

    const snapPoints = useMemo(() => ["60%"], []);

    const handleReportIssue = () => {
        router.push("/(home)/report-issue");
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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

                <TouchableOpacity style={styles.reportButton} onPress={handleReportIssue}>
                    <Text style={styles.reportButtonText}>+ Report an issue</Text>
                </TouchableOpacity>

                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={styles.sheetBackground}
                    handleIndicatorStyle={styles.handle}
                >
                    <BottomSheetView style={styles.sheetContent}>
                        <Text style={styles.sheetTitle}>Reported Issues</Text>

                        <IssueViewCard />
                        <IssueViewCard />
                        <IssueViewCard />
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
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
        zIndex: 10,
    },
    locationIcon: { width: 20, height: 20, resizeMode: "contain" },
    reportButton: {
        position: "absolute",
        top: 20,
        right: 20,
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
        zIndex: 20,
    },
    reportButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    sheetBackground: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    handle: {
        backgroundColor: "#ccc",
        width: 40,
    },
    sheetContent: {
        flex: 1,
        paddingHorizontal: 16,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 12,
    },
});
