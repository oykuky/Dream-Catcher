import DreamForm from "@/components/DreamForm";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col text-center justify-center items-center">
      <Header/>
      <DreamForm/>
    </div>
  );
}
