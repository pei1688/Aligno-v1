import GuestPage from "./_components/GuestPage";

export const metadata = {
  title: "Welcome to Aligno",
};

export default async function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] justify-center bg-gradient-to-br from-aligno-400 to-aligno-600">
      <GuestPage />
    </div>
  );
}
