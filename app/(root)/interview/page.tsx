import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

async function Page() {
    const user = await getCurrentUser();

    return (
        <>
            <h3>Interview Generation</h3>
            <Agent
                userName={user?.name ?? "Guest"} // fallback if user is null/undefined
                userId={user?.id ?? "unknown"}   // fallback id
                type="generate"
            />
        </>
    );
}

export default Page;
