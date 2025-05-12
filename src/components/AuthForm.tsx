// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// interface AuthFormProps {
//     type: "login" | "signup";
//     onSubmit: (email: string, password: string) => Promise<void>;
// }

// export default function AuthForm({ type, onSubmit }: AuthFormProps) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async () => {
//         try {
//         await onSubmit(email, password);
//         } catch (err) {
//         alert(err instanceof Error ? err.message : "An unknown error occurred");
//         }
//     };

//     return (
//         <Card className="p-6 space-y-4 w-full max-w-md">
//         <h1 className="text-xl font-bold text-center">
//             {type === "login" ? "Login" : "Sign Up"}
//         </h1>
//         <input
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-2 border rounded w-full"
//         />
//         <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             className="p-2 border rounded w-full"
//         />
//         <Button onClick={handleSubmit} className="w-full">
//             {type === "login" ? "Log In" : "Sign Up"}
//         </Button>
//         </Card>
//     );
// }
