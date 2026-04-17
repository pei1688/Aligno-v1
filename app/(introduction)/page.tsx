import Footer from "./components/footer";
import Heading from "./components/heading";
import Hero from "./components/hero";
import Introduction from "./components/introduction";

export const metadata = {
  title: "Welcome to Aligno",
};

export default async function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] w-full flex-col bg-aligno-200">
      <div className="flex h-full w-full justify-center bg-aligno-300/30 text-aligno-700">
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
