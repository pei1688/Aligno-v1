import Image from "next/image";
const Spinner = () => {
  return (
    <div>
      <Image
        src="/spinner.svg"
        alt="spinner"
        width={20}
        height={20}
        className="flex justify-center text-aligno-200"
      />
    </div>
  );
};

export default Spinner;
