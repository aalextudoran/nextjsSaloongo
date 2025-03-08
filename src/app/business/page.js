import { useRouter } from "next/navigation";

export default function BusinessPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to Business Portal</h1>
      <button onClick={() => router.push("/business/register")}>
        Register as a Salon Owner
      </button>
    </div>
  );
}
