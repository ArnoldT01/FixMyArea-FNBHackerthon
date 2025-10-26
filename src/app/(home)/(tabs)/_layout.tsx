import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type TabIconProps = {
    source: ImageSourcePropType;
    focused: boolean;
    label: string;
};

const TabIcon = ({ source, focused, label }: TabIconProps) => (
    <View style={styles.tabContainer}>
        <View style={[styles.outerCircle, focused && styles.outerCircleFocused]}>
            <View style={[styles.innerCircle, focused && styles.innerCircleFocused]}>
                <Image source={source} style={styles.icon} resizeMode="contain" />
            </View>
        </View>
        <Text style={[styles.tabLabel]}>
            {label}
        </Text>
    </View>
);

const Layout = () => {
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: "#333333",
                    borderRadius: 50,
                    paddingBottom: 0,
                    overflow: "hidden",
                    marginHorizontal: 20,
                    marginBottom: 40,
                    height: 78,
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row",
                    position: "absolute",
                },
                tabBarItemStyle: {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    paddingVertical: 20,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} source={icons.home} label="Home" />
                    ),
                }}
            />

            <Tabs.Screen
                name="all-issues"
                options={{
                    title: "All Issues",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} source={icons.list} label="Issues" />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} source={icons.profile} label="Profile" />
                    ),
                }}
            />
        </Tabs>
    );
};

export default Layout;

const styles = StyleSheet.create({
    tabContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    outerCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999,
    },
    outerCircleFocused: {
        backgroundColor: '#D1D5DB',
    },
    innerCircle: {
        width: 48,
        height: 48,
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircleFocused: {
        backgroundColor: '#3db67e',
    },
    icon: {
        width: 28,
        height: 28,
        tintColor: 'white',
    },
    tabLabel: {
        fontSize: 9,
        color: 'white',
        marginTop: 4,
    }
});