import Image from "next/image";
const Spinner = () => {
  return (
    <Image
      src="/spinner.svg"
      alt="spinner"
      width={20}
      height={20}
      className="flex justify-center"
    />
  );
};

export default Spinner;
