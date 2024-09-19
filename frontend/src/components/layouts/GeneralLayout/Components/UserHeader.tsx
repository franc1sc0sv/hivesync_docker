type PropsHeader = {
  title: string;
  RightComponent: React.FC;
};

export const Header: React.FC<PropsHeader> = ({ title, RightComponent }) => {
  return (
      <div className="flex flex-row items-center gap-2 justify-between">
        <h1 className="text-3xl font-bold text-custom_white">{title}</h1>
        <RightComponent />
      </div>
  );
};
