import IssueViewCard from "@/components/IssueViewCard";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Issues() {
    const [issues, setIssues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIssues = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("Issues")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching issues:", error);
            } else {
                setIssues(data || []);
            }

            setLoading(false);
        };

        fetchIssues();
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
                                images={Array.isArray(item.images) ? item.images : JSON.parse(item.images || "[]")}
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