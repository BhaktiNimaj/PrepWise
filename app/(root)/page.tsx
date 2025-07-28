import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { dummyInterviews } from "@/constants";

const Page = () => {
    return (
        <div className="bg-black text-white min-h-screen px-4 py-8 space-y-16">
            {/* Hero Section */}
            <section className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 bg-gray-900 p-6 rounded-xl">
                <div className="flex flex-col gap-6 max-w-xl">
                    <h2 className="text-3xl font-bold">Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className="text-lg text-gray-300">
                        Practice on real interview questions & get instant feedback
                    </p>
                    <Button asChild className="btn-primary bg-blue-600 hover:bg-blue-700 text-white max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>

                <Image
                    src="/robot.png"
                    alt="robot"
                    width={400}
                    height={400}
                    className="max-sm:hidden"
                />
            </section>

            {/* Past Interviews Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Your Interviews</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyInterviews.length > 0 ? (
                        dummyInterviews.map((interview) => (
                            <InterviewCard key={interview.id} {...interview} />
                        ))
                    ) : (
                        <p className="text-gray-400">No past interviews available.</p>
                    )}
                </div>
            </section>

            {/* Upcoming Interviews Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Take an Interview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyInterviews.length > 0 ? (
                        dummyInterviews.map((interview) => (
                            <InterviewCard key={interview.id} {...interview} />
                        ))
                    ) : (
                        <p className="text-gray-400">No new interviews available.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Page;
