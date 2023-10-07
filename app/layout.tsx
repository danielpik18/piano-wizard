import UserNav from "@/components/UserNav/UserNav";
import "./globals.css";
import type { Metadata } from "next";
import { Phudu } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import AuthWatch from "@/components/AuthWatch/AuthWatch";

const phudu = Phudu({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={phudu.className}>
                <ReduxProvider>
                    <AuthWatch />
                    <UserNav />
                    <div className="bg-sky-900 h-screen w-screen flex flex-col items-center justify-center">
                        {children}
                    </div>
                </ReduxProvider>
            </body>
        </html>
    );
}
