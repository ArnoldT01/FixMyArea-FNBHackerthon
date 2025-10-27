import { Text, TouchableOpacity, View, StyleSheet, Image, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { SignOutButton } from "@/components/SignOutButton";

export default function Profile() {
    const { user } = useUser();
    const [initial, setInitial] = useState("Mr.");

    const initialsOptions = ["Mr", "Mrs", "Ms", "Dr", "Prof"];

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

            <View style={styles.firstNameRow}>
                <View style={styles.initialColumn}>
                    <Text style={styles.label}>Initials</Text>
                    <View style={styles.initialPickerContainer}>
                        <Picker
                            selectedValue={initial}
                            onValueChange={(itemValue: string) => setInitial(itemValue)}
                            style={styles.initialPicker}
                            dropdownIconColor="#000"
                            mode="dropdown"
                            enabled={false}
                        >
                            {initialsOptions.map((opt) => (
                                <Picker.Item key={opt} label={opt} value={opt} />
                            ))}
                        </Picker>

                        {/* Hack to prevent Android crash */}
                        {/* didnt work */}
                        {/* link to stackoverflow: https://stackoverflow.com/questions/66670721/react-native-picker-picker-causes-my-app-to-crash-android */}
                        {/* temp fix: disabled the Picker */}
                        {/* Google search query: https://www.google.com/search?q=Picker+react+native+expo+crashing+my+app&rlz=1C1GCEA_enZA1165ZA1165&oq=Picker+react+native+expo+crashing+my+app&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRiPAjIHCAIQIRiPAtIBCDcwNjJqMGoxqAIAsAIA&sourceid=chrome&ie=UTF-8 */}
                        <Text style={{ width: "100%", height: 50, position: "absolute", bottom: 0, left: 0 }}>
                            {" "}
                        </Text>
                    </View>
                </View>

                <View style={styles.firstNameColumn}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        value={user?.firstName || "Not found"}
                        editable={false}
                        style={styles.input}
                    />
                </View>
            </View>

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

            <SignOutButton/>
        </View>
    );
}

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
    firstNameRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    initialColumn: {
        width: 100,
    },
    initialPickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        height: 50,
        justifyContent: "center"
    },
    initialPicker: {
        width: "100%",
        height: "100%",
        color: "#000",
    },
    firstNameColumn: {
        flex: 1,
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