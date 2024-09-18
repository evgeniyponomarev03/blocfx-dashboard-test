import Images from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

const Card = () => {
  return (
    <div className="relative h-[183px] w-[284px] mx-auto">
      <Image
        className="object-cover"
        src={Images.Card}
        alt="card"
        fill
        unoptimized
      />
      <Link
        href="/card-order"
        className="absolute left-1/2 bottom-12 -translate-x-1/2 font-bold spacing tracking-[2px]
      shadow-md p-2 w-2/3 rounded-xl text-center"
      >
        Order your card
      </Link>
    </div>
  );
};

export default Card;
