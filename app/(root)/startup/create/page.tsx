import {auth} from "@/auth";
import {redirect} from "next/navigation";
import StartupForm from "@/components/StartupForm";
import {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";

async function CreateStartupContent() {
    const session = await auth();

    if(!session) redirect("/");

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">Submit Your Startup</h1>
            </section>

            <StartupForm />
        </>
    )
}

const Page = () => {
    return (
        <Suspense fallback={<Skeleton className="w-full h-screen" />}>
            <CreateStartupContent />
        </Suspense>
    )
}
export default Page
