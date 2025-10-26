import { Text, TouchableOpacity, View, StyleSheet, Image, TextInput } from "react-native";
import { useUser } from "@clerk/clerk-expo";

export default function Profile() {
    const { user } = useUser();

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
            
                <TouchableOpacity>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
                 <Image
                    source={{ uri: user?.imageUrl || "https://www.gravatar.com/avatar?d=mp" }}
                    style={styles.profileImage}
                />
            </View>

            <Text style={styles.label}>First Name</Text>
            <TextInput
                value={user?.firstName || "Not found"}
                editable={false}
                style={styles.input}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
                value={user?.lastName || "Not found"}
                editable={false}
                style={styles.input}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                value={user?.emailAddresses[0].emailAddress || "Not found"}
                style={styles.input}
                editable={false}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    editButton: {
        fontSize: 16,
        color: "#007AFF",
        fontWeight: "600",
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 999,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 16,
        marginHorizontal: 5,
        paddingVertical: 15,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 15,
    },
});