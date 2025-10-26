import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function ReportIssue() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Report an Issue</Text>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    backButton: {
        backgroundColor: "Transparent",
        padding: 12,
        borderRadius: 8,
    },
    backButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    closeButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    closeButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
