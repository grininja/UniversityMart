import Link from "next/link";
import { useSession } from "next-auth/react";
export default function Home({ institutes }) {
  const { status } = useSession({
    required: true,
  });
  return (
    <div>
      <h1>{status}</h1>
      <ul>
        <li>
          <Link href="/loginuser">Login user</Link>
        </li>
      </ul>
    </div>
  );
}
