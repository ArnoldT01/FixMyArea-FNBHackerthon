import { useLocalSearchParams, useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { parseIssueImages } from "@/services/issuesService";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useRef } from "react";

export default function IssueDetails() {
    const { issue } = useLocalSearchParams();
    const router = useRouter();
    const mapRef = useRef<MapView>(null);

    const parsed = JSON.parse(issue as string);
    const images = parseIssueImages(parsed.images);

    const coords = typeof parsed.location === "string" ? JSON.parse(parsed.location) : parsed.location;
    const snapPoints = useMemo(() => ["40%", "90%"], []);

    const zoomDelta = 0.002;
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: zoomDelta,
                longitudeDelta: zoomDelta,
            }, 500);
        }
    }, [coords]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Queued":
            case "Fixing":
                return "#FFA500";
            case "Fixed":
                return "green";
            case "New":
            default:
                return "gray";
        }
    };

    const screenWidth = Dimensions.get("window").width;
    const imageSize = (screenWidth - 48) / 2;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: zoomDelta,
                        longitudeDelta: zoomDelta,
                    }}
                >
                    <Marker
                        coordinate={coords}
                        title={parsed.category}
                        description={parsed.description}
                    />
                </MapView>

                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={{ color: "#fff" }}>Back</Text>
                </TouchableOpacity>

                <BottomSheet snapPoints={snapPoints} index={0}>
                    <BottomSheetView style={styles.sheet}>
                        <ScrollView 
                            contentContainerStyle={{ paddingBottom: 20 }}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                        >
                            <Text style={styles.title}>{parsed.category}</Text>
                            <Text style={[styles.status, { color: getStatusColor(parsed.status) }]}>{parsed.status}</Text>
                            <Text style={styles.description}>{parsed.description}</Text>

                            <View style={styles.imagesContainer}>
                                {images.map((img, i) => (
                                    <Image
                                        key={i}
                                        source={{ uri: img }}
                                        style={[styles.image, { width: imageSize, height: imageSize }]}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 20,
        left: 20,
        backgroundColor: "#007AFF",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        zIndex: 10,
    },
    sheet: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8,
    },
    status: {
        fontSize: 16,
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: "#555",
        marginBottom: 12,
    },
    imagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    image: {
        borderRadius: 8,
        marginBottom: 8,
    },
});
