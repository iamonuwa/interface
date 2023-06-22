import { ComponentPropsWithRef, FC } from "react";

interface ContainerProps extends ComponentPropsWithRef<"div"> {}

const Container: FC<ContainerProps> = ({ children, ...rest }) => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" {...rest}>
      {children}
    </div>
  );
};

export default Container;
