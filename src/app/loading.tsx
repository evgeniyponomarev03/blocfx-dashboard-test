import Container from "@/components/ui/Container";
import Loading from "@/components/widgets/Loading";

export default function LoadingPage() {
  return (
    <div className="w-full h-[100dvh] mx-auto bg-black flex justify-center items-center">
      <Container>
        <Loading />
      </Container>
    </div>
  );
}
