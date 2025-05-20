"use client";

import { Card } from "@/components/ui/card";
import { FiTrash2 } from "react-icons/fi";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { TMessage, TMongoose } from "@/types/types";
import ConfirmationBox from "../shared/ConfirmationBox";
import { toast } from "sonner";

interface MessageCardProps {
  data: TMessage & TMongoose;
}

const MessageCard = ({ data }: MessageCardProps) => {
  const { message, email, name } = data;

  const deleteMessage = async (id: string) => {
    const toastId = toast.loading("Deleting message...");

    const res = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Message deleted successfully", {
        id: toastId,
      });
    } else {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <CardContainer className="inter-var w-72 sm:w-96 md:w-full">
      <Card className="w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-teal-100 to-violet-100 dark:from-rose-900/20 dark:via-teal-900/20 dark:to-violet-900/20 border-none">
        <CardBody className="relative w-72 sm:w-96 md:w-full h-fit flex flex-col gap-y-3 dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] rounded-xl p-2 md:p-6">
          <CardItem className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white">
            {name}
          </CardItem>

          <CardItem className="text-neutral-500 text-sm dark:text-neutral-300">
            {email}
          </CardItem>

          <CardItem className="text-neutral-500 text-xs sm:text-sm dark:text-neutral-300">
            {message}
          </CardItem>

          <CardItem className="mt-auto">
            <ConfirmationBox
              trigger={
                <p className="text-xs sm:text-sm flex items-center gap-1 justify-center bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3 rounded-md">
                  <FiTrash2 className="w-3 h-3 md:w-4 md:h-4" />
                  Delete
                </p>
              }
              onConfirm={() => deleteMessage(data._id)}
            />
          </CardItem>
        </CardBody>
      </Card>
    </CardContainer>
  );
};

export default MessageCard;
