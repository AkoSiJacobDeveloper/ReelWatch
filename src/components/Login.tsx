"use client"
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/Auth/login")
    }
    return (
        <Button className="cursor-pointer" onClick={handleLoginClick}>Login</Button>
    )
}