import Link from "next/link";
export default function Home({ institutes }) {
  return (
    <ul>
      <li>
        <Link href="/loginuser">Login user</Link>
      </li>
    </ul>
  );
}
