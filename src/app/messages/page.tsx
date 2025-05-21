import MessageCard from "@/components/cards/MessageCard";
import ContainerComponent from "@/components/shared/ContainerComponent";
import { NoData } from "@/components/shared/NoData";
import { getAllMessages } from "@/services/message.service";
import { TMessage, TMongoose } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Message",
  description: "Add, Edit, Delete, and View Messages",
};

const MessagePage = async () => {
  const res = await getAllMessages();

  return (
    <ContainerComponent className="mt-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">All Messages</h1>
      </div>
      <div>
        {res?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 items-center justify-center gap-4">
            {res?.data?.map((message: TMessage & TMongoose) => (
              <MessageCard data={message} key={message?._id} />
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </ContainerComponent>
  );
};

export default MessagePage;
