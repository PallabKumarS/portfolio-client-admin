interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ContainerComponent = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`mx-auto w-full px-4 mt-4 ${className}`}>{children}</div>
  );
};

export default ContainerComponent;
