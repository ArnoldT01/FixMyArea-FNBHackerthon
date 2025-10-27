import IssueViewCard from "@/components/IssueViewCard";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { fetchIssues, parseIssueImages } from "@/services/issuesService";
import { subscribeToIssues } from "@/services/issueSubscriptionService";
import { router } from "expo-router";

export default function Issues() {
    const [issues, setIssues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadIssues = async () => {
            setLoading(true);
            const data = await fetchIssues();
            setIssues(data);
            setLoading(false);
        };

        loadIssues();

        const subscription = subscribeToIssues(
            (newIssue) => setIssues(prev => [newIssue, ...prev]),
            (updatedIssue) => setIssues(prev => prev.map(i => i.id === updatedIssue.id ? updatedIssue : i)),
            (deletedIssue) => setIssues(prev => prev.filter(i => i.id !== deletedIssue.id))
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Loading issues...</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView>
            <View style={styles.container}>
                <Text style={[styles.title, { marginBottom: 30 }]}>Issues</Text>
                {issues.length === 0 ? (
                    <Text style={{ textAlign: "center", marginTop: 50 }}>No issues found.</Text>
                ) : (
                    <FlatList
                        data={issues}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        renderItem={({ item }) => (
                            <IssueViewCard
                                category={item.category}
                                status={item.status}
                                location={item.location}
                                date_reported={item.date_reported}
                                description={item.description}
                                images={parseIssueImages(item.images)}
                                onPress={() =>
                                    router.push({
                                        pathname: "/(home)/issue-details",
                                        params: { issue: JSON.stringify(item) },
                                    })
                                }
                            />
                        )}
                    />
                )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});