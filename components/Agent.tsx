"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

interface AgentProps {
    userName: string;
    userId: string;
    type: "generate" | "interview";
    interviewId?: string;
}

function Agent({ userName, userId, type, interviewId }: AgentProps) {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: TranscriptMessage) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                if (!message.transcript || !message.role) return;

                const newMessage: SavedMessage = {
                    role: message.role,
                    content: message.transcript,
                };

                setMessages((prev) => [...prev, newMessage]);
            }
        };


        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("speech-start", () => setIsSpeaking(true));
        vapi.on("speech-end", () => setIsSpeaking(false));
        vapi.on("error", (err) => console.error("Vapi error:", err));

        return () => {
            vapi.removeAllListeners();
        };
    }, []);

    useEffect(() => {
        if (callStatus === CallStatus.FINISHED && messages.length > 0) {
            if (type === "interview" && interviewId) {
                createFeedback({
                    interviewId,
                    userId,
                    transcript: messages,
                }).then((res) => {
                    if (res.success && res.feedbackId) {
                        router.push(`/interview/${interviewId}/feedback`);
                    } else {
                        router.push("/");
                    }
                });
            } else {
                router.push("/");
            }
        }
    }, [callStatus]);

    const handleCall = async () => {
        if (callStatus === CallStatus.CONNECTING || callStatus === CallStatus.ACTIVE) return;

        setCallStatus(CallStatus.CONNECTING);

        try {
            const workflowId =
                type === "interview"
                    ? process.env.NEXT_PUBLIC_INTERVIEWER_WORKFLOW_ID
                    : process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;

            if (!workflowId) throw new Error("Missing workflow ID");

            await vapi.start(workflowId, {
                variableValues: {
                    username: userName,
                    userid: userId,
                },
            });
        } catch (error) {
            console.error("Start Call Error:", error);
            setCallStatus(CallStatus.INACTIVE);
        }
    };

    const handleDisconnect = async () => {
        try {
            await vapi.stop();
            setCallStatus(CallStatus.FINISHED);
        } catch (err) {
            console.error("Disconnect Error:", err);
        }
    };

    const latestMessage = messages[messages.length - 1]?.content;

    return (
        <>
            <div className="call-view">
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src="/user-avatar.png"
                            alt="user"
                            width={540}
                            height={540}
                            className="rounded-full object-cover size-[120px]"
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className="transcript-border">
                    <div className="transcript">
                        <p key={latestMessage} className="animate-fadeIn">{latestMessage}</p>
                    </div>
                </div>
            )}

            <div className="w-full flex justify-center">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className="relative btn-call" onClick={handleCall}>
                        <span className="absolute animate-ping rounded-full opacity-75" />
                        <span>{callStatus === CallStatus.INACTIVE ? "Call" : "..."}</span>
                    </button>
                ) : (
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                        End
                    </button>
                )}
            </div>
        </>
    );
}

export default Agent;
