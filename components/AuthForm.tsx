"use client";

import { useRouter } from "next/navigation"; // ✅ For router.push()
import { toast } from "react-hot-toast"; // ✅ For toast.success()
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const isSignIn = type === "sign-in";

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(`${type} submitted:`, values);

            if (type === "sign-up") {
                toast.success("Account created successfully. Please sign in.");
                router.push("/sign-in");
            } else {
                toast.success("Sign in successfully.");
                router.push("/");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 bg-gray-900 text-white rounded-xl shadow-lg p-8 border border-gray-700">
            <div className="flex flex-col items-center mb-6">
                <Image src="/logo.svg" alt="logo" height={40} width={40} />
                <h2 className="text-2xl font-bold mt-2">
                    {isSignIn ? "Sign In to PrepWise" : "Create Your PrepWise Account"}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    Practice job interviews with AI
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {!isSignIn && (
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Name"
                                            {...field}
                                            className="bg-gray-800 text-white border border-gray-600"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Email"
                                        {...field}
                                        className="bg-gray-800 text-white border border-gray-600"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm">Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                        className="bg-gray-800 text-white border border-gray-600"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        className="w-full bg-violet-800 text-white hover:bg-violet-700"
                        type="submit"
                    >
                        {isSignIn ? "Sign In" : "Create Account"}
                    </Button>
                </form>
            </Form>

            <p className="text-center text-sm mt-4 text-gray-400">
                {isSignIn ? "Don't have an account?" : "Already have an account?"}
                <Link
                    href={isSignIn ? "/sign-up" : "/sign-in"}
                    className="ml-1 text-violet-400 font-semibold hover:underline"
                >
                    {isSignIn ? "Sign Up" : "Sign In"}
                </Link>
            </p>
        </div>
    );
};

export default AuthForm;
