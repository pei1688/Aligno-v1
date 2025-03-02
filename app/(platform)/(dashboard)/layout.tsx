import Navbar from "./_components/NavBar";

const DashLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div  className="h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default DashLayout;
