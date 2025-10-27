import { useLocalSearchParams, useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import { parseIssueImages } from "@/services/issuesService";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function IssueDetails() {
    const { issue } = useLocalSearchParams();
    const router = useRouter();

    const parsed = JSON.parse(issue as string);
    const images = parseIssueImages(parsed.images);

    const coords = typeof parsed.location === "string" ? JSON.parse(parsed.location) : parsed.location;
    const snapPoints = useMemo(() => ["50%"], []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                <Marker coordinate={coords} title={parsed.category} description={parsed.description} />
            </MapView>

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={{ color: "#fff" }}>Back</Text>
            </TouchableOpacity>

            <BottomSheet snapPoints={snapPoints} index={0}>
                <BottomSheetView style={styles.sheet}>
                    <Text style={styles.title}>{parsed.category}</Text>
                    <Text style={[styles.status, { color: "gray" }]}>{parsed.status}</Text>
                    <Text style={styles.description}>{parsed.description}</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                        {images.map((img, i) => (
                            <Image
                                key={i}
                                source={{ uri: img }}
                                style={{ width: 120, height: 120, borderRadius: 10, marginRight: 10 }}
                            />
                        ))}
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
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    status: {
        fontSize: 16,
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: "#555",
        marginBottom: 10,
    },
});
