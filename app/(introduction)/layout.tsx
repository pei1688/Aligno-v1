import Navbar from "./_components/Navbar";

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
