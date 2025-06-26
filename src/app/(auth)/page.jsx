import LoginForm from "@/components/authComponents/LoginForm";
import { sessionRedirect } from "@/lib/sessionRedirect";

export default async function Home() {
    await sessionRedirect();
    return <LoginForm />;
}
