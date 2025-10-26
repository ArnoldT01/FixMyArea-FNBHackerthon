import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useState } from "react";

export default function ReportIssue() {
    const router = useRouter();

    const [category, setCategory] = useState("water");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [address, setAddress] = useState("");

    const pickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            const uris = result.assets.map((asset) => asset.uri);
            setImages([...images, ...uris]);
        }
    };

    const useCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access location was denied");
            return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setAddress(`${loc.coords.latitude}, ${loc.coords.longitude}`);
    };

    const handleSubmit = () => {
        console.log({ category, description, images, address });
        alert("Issue submitted!");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Report an Issue</Text>

                <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Category Picker */}
                <Text style={styles.label}>Category</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Water" value="water" />
                        <Picker.Item label="Electricity" value="electricity" />
                        <Picker.Item label="Transport" value="transport" />
                    </Picker>
                </View>

                {/* Description */}
                <Text style={styles.label}>Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    style={styles.textArea}
                    placeholder="Describe the issue..."
                    multiline
                    numberOfLines={4}
                />

                {/* Images */}
                <Text style={styles.label}>Images</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
                    <Text style={styles.uploadButtonText}>Upload Images</Text>
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                    {images.map((uri, index) => (
                        <Image key={index} source={{ uri }} style={styles.previewImage} />
                    ))}
                </ScrollView>

                {/* Address */}
                <Text style={styles.label}>Address</Text>
                <View style={styles.addressRow}>
                    <TextInput
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter address"
                        style={[styles.input, { flex: 1 }]}
                    />
                    <TouchableOpacity style={styles.locationButton} onPress={useCurrentLocation}>
                        <Text style={{ color: "#fff" }}>Use Current Location</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Submit button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 40 },
    title: { fontSize: 24, fontWeight: "bold" },
    closeButton: { backgroundColor: "#007AFF", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
    closeButtonText: { color: "#fff", fontWeight: "600" },

    label: { fontSize: 16, fontWeight: "500", marginBottom: 8 },

    pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 16 },
    picker: { width: "100%", height: 50 },

    textArea: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 12, textAlignVertical: "top", marginBottom: 16 },

    uploadButton: { backgroundColor: "#007AFF", paddingVertical: 12, borderRadius: 10, alignItems: "center", marginBottom: 10 },
    uploadButtonText: { color: "#fff", fontWeight: "600" },
    previewImage: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },

    addressRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
    locationButton: { backgroundColor: "#3db67e", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 },

    submitButton: { backgroundColor: "#007AFF", paddingVertical: 14, borderRadius: 10, alignItems: "center", marginTop: 10, width: '60%', alignSelf: "center" },
    submitButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
