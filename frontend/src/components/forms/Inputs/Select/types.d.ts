type Option = {
  id: string;
  name: string;
  serverId: string;
};

type Options = Option[];

type PropsSelect = {
  name: string;
  text: string;
  required: boolean;
  placeholder: string;
  Icon: IconType;
  StrokeIcon: boolean;
  options: Options;
  setValue: UseFormSetValue<FieldValues>;
};
