interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerComponent = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-[96%] lg:max-w-[90%] mt-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default ContainerComponent;
