import { ReactNode } from "react";
import { SlideDrawer } from "./SlideDrawer";

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function ProfileEditDrawer(props: Props) {
  return <SlideDrawer {...props} />;
}
