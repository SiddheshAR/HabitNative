import { useAuth } from "@/lib/auth-context";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // Initialize with null
    const [isLoading, setIsLoading] = useState<boolean>(false); // For loading indicator
    const [firstName, setFirstName] = useState<string>(""); // Added for registration
    const [lastName, setLastName] = useState<string>("");
    
    const { signIn, signUp } = useAuth();

    async function handleAuth(){
        setError(null);
        if(!email.trim() || !password.trim()){
            setError("Please fill all the inputs")
            return
        }
        if(isSignUp && (!firstName.trim() || !lastName.trim())){
            setError('First Name & Last Name is required')
            return;
        }
        if(password.length < 8){
            setError("Password must be at least 8 characters long.")
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        let result:any;
        try{
            setIsLoading(true);
        if(isSignUp){
            result = await signUp({first_name:firstName,last_name:lastName,email,password});
        }else{
            result = await signIn(email,password)
        }
        if(!result){
            setError(null);
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            router.replace('/(tabs)')
        }else{
            setError(result.error || "Authentication Failed.")
        }
        }catch(e){
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unexpected error occurred.");
            }
            console.error("Authentication error:", e);
        } finally{
            setIsLoading(false);
        }

    }

    function handleSwitchMode() {
        setIsSignUp((prev) => !prev);
        setError(null); // Clear errors when switching mode
                setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.formContainer}>
                <Text style={styles.mainTitle}>
                    {isSignUp ? "Create Account" : "Welcome Back"}
                </Text>
                <View style={styles.mainInputStyles}>
                                        {isSignUp && (
                        <>
                            <TextInput
                                style={styles.textInputStyle}
                                value={firstName}
                                label={"First Name"}
                                placeholder="Enter your first name"
                                mode="outlined"
                                onChangeText={setFirstName}
                                autoCapitalize="words"
                                disabled={isLoading}
                            />
                            <TextInput
                                style={styles.textInputStyle}
                                value={lastName}
                                label={"Last Name"}
                                placeholder="Enter your last name"
                                mode="outlined"
                                onChangeText={setLastName}
                                autoCapitalize="words"
                                disabled={isLoading}
                            />
                        </>
                    )}
                    <TextInput
                        style={styles.textInputStyle}
                        value={email}
                        label={"Email"}
                        keyboardType="email-address"
                        placeholder="example@gmail.com"
                        mode="outlined"
                        onChangeText={text => setEmail(text)}
                        autoCapitalize="none"
                        disabled={isLoading}
                    />
                    <TextInput
                        style={styles.textInputStyle}
                        secureTextEntry
                        mode="outlined"
                        value={password}
                        label={"Password"}
                        onChangeText={p => setPassword(p)} // Changed param name to avoid conflict if needed
                        disabled={isLoading}
                    />
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#56428b" style={styles.loader} />
                    ) : (
                        <Button
                            mode="contained" // Changed to contained for primary action
                            buttonColor="#56428b"
                            textColor="white"
                            onPress={handleAuth}
                            style={styles.authButton}
                            disabled={isLoading}
                        >
                            {isSignUp ? "Sign Up" : "Sign In"}
                        </Button>
                    )}

                    <Button
                        mode="text"
                        onPress={handleSwitchMode}
                        textColor="#56428b" // Give it a distinct color
                        disabled={isLoading}
                        style={styles.switchButton}
                    >
                        {isSignUp
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"}
                    </Button>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20, // Add some horizontal padding
        backgroundColor: '#f5f5f5', // A light background color
    },
    formContainer: {
        // Optional: if you want to group form elements visually
    },
    mainTitle: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 28, // Slightly larger
        fontWeight: 'bold',
        color: '#333',
    },
    mainInputStyles: {
        gap: 15, // Increased gap for better spacing
    },
    textInputStyle: {
        // 'padding': 2 // Padding is usually handled by the TextInput itself in 'outlined' mode
    },
    errorText: {
        color: '#c0392b', // A more standard error red
        textAlign: 'center',
        marginVertical: 10,
    },
    authButton: {
        marginTop: 10,
        paddingVertical: 6, // Add some vertical padding to the button
    },
    switchButton: {
        marginTop: 5,
    },
    loader: {
        marginVertical: 20, // Give loader some space
    }
});