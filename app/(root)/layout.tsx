'use client';
import {redirect} from "next/navigation";
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {isAuthenticated} from "@/lib/actions/auth.action";

const RootLayout = async ({ children }: { children: ReactNode }) => {
    const isUserAuthenticated= await isAuthenticated();
    if(isUserAuthenticated) redirect('/');
    return (
        <div className="min-h-screen bg-black text-white">
            <nav className="p-4 border-b border-gray-800 bg-black">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.svg" alt="Logo" width={38} height={32} />
                        <h2 className="text-white font-bold text-lg">PrepWise</h2>
                    </Link>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
    );
};

export default RootLayout;
