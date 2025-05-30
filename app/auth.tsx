import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function AuthScreen(){

    return(<KeyboardAvoidingView behavior={Platform.OS === "ios"?"padding":"height"}>
        <View>
            <Text>Login Page</Text>
            <Text>New asdasd New asdasd New asdasdNew asdasd New asdasdNew asdasdNew asdasd New asdasd New asdasd New asdasd</Text>
        </View>
    </KeyboardAvoidingView>)
}