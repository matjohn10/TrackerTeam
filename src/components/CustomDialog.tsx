import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface Props {
  child: ReactNode;
  title: string;
  description: string;
  contentChildren: ReactNode;
  additionalClose: ReactNode;
}

export function CustomDialog({
  child,
  title,
  contentChildren,
  description,
  additionalClose,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{child}</DialogTrigger>
      <DialogContent className="sm:max-w-md h-fit max-h-[55%]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {contentChildren}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              className="hover:bg-[#ff5416] hover:text-white"
            >
              Close
            </Button>
          </DialogClose>
          {additionalClose}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
