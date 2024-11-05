import DreamForm from "@/components/DreamForm";
import Header from "@/components/Header";
import { useTranslations } from "next-intl";


export default function Home() {
  const t =useTranslations();
  return (
    <div className="flex flex-col text-center justify-center items-center">
      {t("header.home")}
      <Header/>
      <DreamForm/>
    </div>
  );
}
