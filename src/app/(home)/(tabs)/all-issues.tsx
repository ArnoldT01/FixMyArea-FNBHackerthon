import IssueViewCard from "@/components/IssueViewCard";
import { Text, View, StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

export default function About() {
    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text style={[styles.title, { marginBottom: 30 }]}>Issues</Text>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                    <IssueViewCard />
                </ScrollView>
            </View>
        </GestureHandlerRootView>
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
});