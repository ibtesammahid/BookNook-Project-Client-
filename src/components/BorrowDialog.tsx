"use client";

import { useState } from "react";
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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BorrowDialogProps = {
  userName: string;
  userEmail: string;
  isBorrowing: boolean;
  canBorrow: boolean;
  onBorrow: () => Promise<boolean>;
};

export default function BorrowDialog({
  userName,
  userEmail,
  isBorrowing,
  canBorrow,
  onBorrow,
}: BorrowDialogProps) {
  const [open, setOpen] = useState(false);

  const handleBorrow = async () => {
    const success = await onBorrow();

    if (success) {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            disabled={!canBorrow}
            className="h-11 rounded-md bg-[#B3372B] px-10 text-sm font-semibold text-white hover:bg-[#B3372B]/90"
          >
            Borrow Book
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow this book?</DialogTitle>
          <DialogDescription>
            Confirm your account details before borrowing one copy.
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <Label htmlFor="borrow-name">Username</Label>
            <Input id="borrow-name" value={userName} readOnly />
          </Field>

          <Field>
            <Label htmlFor="borrow-email">Email</Label>
            <Input id="borrow-email" value={userEmail} readOnly />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button
            type="button"
            disabled={!canBorrow || isBorrowing}
            onClick={handleBorrow}
            className="bg-[#B3372B] text-white"
          >
            {isBorrowing ? "Borrowing..." : "Borrow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
