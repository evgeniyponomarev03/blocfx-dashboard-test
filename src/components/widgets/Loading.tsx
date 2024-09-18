import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";

const Loading = () => {
  return (
    <Image
      src={Logo}
      alt="blocfx"
      width={500}
      height={500}
      className="animate-pulse"
      unoptimized
      priority
    />
  );
};

export default Loading;
