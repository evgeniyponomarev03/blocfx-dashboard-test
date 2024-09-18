import Images from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

const Card = ({ fullScreen }: { fullScreen: boolean }) => {
  return (
    <div
      className={`h-[183px] w-[284px] mx-auto z-10 transition-all duration-500  ${
        fullScreen ? "static opacity-0" : "relative"
      }`}
    >
      <Image
        className="object-cover"
        src={Images.Card}
        alt="card"
        width={284}
        height={183}
        unoptimized
      />
      <Link
        href="/card-order"
        className="absolute left-1/2 bottom-12 -translate-x-1/2 font-bold spacing tracking-[2px] shadow-md p-2 w-2/3 rounded-xl text-center"
      >
        Order your card
      </Link>
    </div>
  );
};

export default Card;
