import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Page() {

  return (
    <View>

      <SignedIn>
        <Redirect href={"/(home)/(tabs)/home"} />
      </SignedIn>

      <SignedOut>
        <Redirect href={"/(auth)/sign-in"} />
      </SignedOut>

    </View>
  )
}