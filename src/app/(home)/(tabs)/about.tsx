import { Text, View, StyleSheet } from "react-native";

export default function About() {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { marginBottom: 30 }]}>About</Text>
            <Text style={styles.label}>About the app</Text>
            <Text style={styles.content}>Iplorem</Text>

            <Text style={styles.label}>Where to report if you find a bug</Text>
            <Text style={styles.content}>e.t.c</Text>

            <Text style={styles.label}>E.t.c</Text>
            <Text style={styles.content}>e.t.c</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
    },
    content: {
        marginBottom: 30
    }
});