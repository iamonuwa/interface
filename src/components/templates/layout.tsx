import type { ComponentPropsWithRef, FC } from "react";

interface LayoutProps extends ComponentPropsWithRef<"main"> {}

const Layout: FC<LayoutProps> = ({ children, ...rest }) => {
  return (
    <main {...rest} className="md:py-20">
      {children}
    </main>
  );
};

export default Layout;
