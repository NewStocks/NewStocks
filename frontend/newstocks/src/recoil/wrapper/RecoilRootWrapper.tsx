"use client";

import { RecoilRoot } from "recoil";
import { ReactNode, PropsWithChildren } from "react";

export default function RecoilRootWrapper({
  children,
}: PropsWithChildren) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
