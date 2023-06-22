import type { ComponentPropsWithRef, FC } from "react";
import Container from "@/components/atoms/container";

interface LayoutProps extends ComponentPropsWithRef<"main"> {}

const Layout: FC<LayoutProps> = ({ children, ...rest }) => {
  return (
    <main {...rest} className="md:py-20">
      <Container>{children}</Container>
    </main>
  );
};

export default Layout;
