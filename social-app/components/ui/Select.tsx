import { Dropdown }
from "react-native-element-dropdown";

interface Props {
  value: string;
  data: {
    label: string;
    value: string;
  }[];

  placeholder: string;

  onChange: (
    value: string
  ) => void;
}

export default function Select({
  value,
  data,
  placeholder,
  onChange,
}: Props) {
  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={(item) =>
        onChange(item.value)
      }
    />
  );
}
