import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";
type TModalProps = {
  title: string;
  trigger: ReactNode;
  content: ReactNode;
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};
export function Modal({
  title,
  trigger,
  content,
  isOpen,
  setIsOpen,
}: TModalProps) {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-4rem)] overflow-y-auto bg-card min-w-[290px] w-3/4">
        <DialogHeader>
          <DialogTitle className="text-primary">{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
