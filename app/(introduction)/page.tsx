import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Hero from "./_components/Hero";
import Introduction from "./_components/Introduction";

export const metadata = {
  title: "Welcome to Aligno",
};

export default async function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] w-full flex-col bg-neutral-300">
      <div className="flex h-full w-full justify-center text-neutral-800">
        <div className="w-full max-w-[1280px] px-8">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <Heading />
            <Hero />
          </div>
        </div>
      </div>
      <Introduction />
      <hr className="border-aligno-300" />
      <Footer />
    </div>
  );
}
