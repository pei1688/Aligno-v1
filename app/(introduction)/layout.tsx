import Navbar from "./components/nav-bar";

const BrandLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div>
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default BrandLayout;
