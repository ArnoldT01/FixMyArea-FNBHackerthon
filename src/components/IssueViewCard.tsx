import { Text, View, StyleSheet, Image, ScrollView } from "react-native";

type IssueProps = {
    category: string;
    status: string;
    location: string;
    date_reported: string;
    description: string;
    images: string[];
};

export default function IssueViewCard({
    category,
    status,
    location,
    date_reported,
    description,
    images,
}: IssueProps) {
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

    const formattedLocation = (() => {
        if (typeof location === "string") {
            try {
                const locObj = JSON.parse(location);
                const lat = locObj.latitude.toFixed(5);
                const lon = locObj.longitude.toFixed(5);
                return `${lat}, ${lon}`;
            } catch {
                return location;
            }
        }
        return location;
    })();

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={[styles.leftText, { fontSize: 18 }]}>{category}</Text>
                <Text style={[styles.rightText, { color: getStatusColor(status), fontWeight: "bold" }]}>
                    {status}
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.leftText} numberOfLines={1}>{formattedLocation}</Text>
                <Text style={styles.rightText}>{date_reported}</Text>
            </View>

            <Text style={styles.description} numberOfLines={1}>{description}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageRow}>
                {images.map((img, idx) => (
                    <Image key={idx} source={{ uri: img }} style={styles.image} />
                ))}
            </ScrollView>
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
    },
    description: {
        color: "#555",
    },
    imageRow: {
        marginTop: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 8,
    },
});
