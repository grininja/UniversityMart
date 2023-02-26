import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { status } = useSession({
    required: false,
    // onUnauthenticated() {
    //   router.push("/authentication/loginInstitute");
    // },
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
        <li>
          <Link href="/adminLayouts/WebAdmin/WebAdminDashboard">Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}
