import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import SignUpFormUser from "@/components/Authentication/register";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <SignUpFormUser />;
}
