import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { status } = useSession({
    required: false,
  });
  return (
    <div>
      <h1>{status}</h1>
      <ul>
        <li>
          <Link href="/authentication/loginuser">Login user</Link>
        </li>
        <li>
          <Link href="/authentication/signUpUniversity">signUpUniversity</Link>
        </li>
        <li>
          <Link href="/authentication/loginInstitute">login university</Link>
        </li>
      </ul>
    </div>
  );
}
