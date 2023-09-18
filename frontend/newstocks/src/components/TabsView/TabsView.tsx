"use client";
import styles from "./TabsView.module.css";
import TabHeader from "./TabHeader/TabHeader";
import CompanyInfo from "./CompanyInfo/CompanyInfo";

import { usePathname, useSearchParams } from "next/navigation";

export default function TabsView() {
  const tabName = useSearchParams();

  console.log(tabName?.get("tab"));

  return (
    <div>
      <TabHeader />
      {tabName?.get("tab") === "chat" && "여기에 chatbot"}
      {tabName?.get("tab") === "company" && <CompanyInfo />}
    </div>
  );
}
