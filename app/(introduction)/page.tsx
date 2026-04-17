import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Hero from "./_components/Hero";
import Introduction from "./_components/Introduction";

export const metadata = {
  title: "Welcome to Aligno",
};

export default async function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] w-full flex-col bg-white">
      <div className="flex w-full flex-col items-center">
        <Heading />
        <Hero />
      </div>
      <Introduction />
      <Footer />
    </div>
  );
}
