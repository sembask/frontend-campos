import type { PropsWithChildren } from "react";
import { Header } from "./header";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen container mx-auto py-8">{children}</main>
    </div>
  );
};
