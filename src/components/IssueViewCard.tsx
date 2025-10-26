import { Text, View, StyleSheet } from "react-native";

export default function IssueViewCard() {
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={[styles.leftText, { fontSize: 20 }]}>Category</Text>
                <Text style={styles.rightText}>Currently fixing or not</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.leftText}>Location</Text>
                <Text style={styles.rightText}>Date it was reported</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        marginVertical: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    leftText: {
        fontWeight: "500",
        flex: 1,
    },
    rightText: {
        textAlign: "right",
        flex: 1,
        color: "gray",
    },
});