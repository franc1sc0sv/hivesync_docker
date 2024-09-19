export function addMessageToGroupedMessages({
  messages,
  newMessage,
}: {
  messages: GroupedMessagesTypeArray;
  newMessage: Message;
}): GroupedMessagesTypeArray {
  const updatedMessages = [...messages];

  const lastIndex = updatedMessages.length - 1;
  const lastIndexFromUser =
    updatedMessages[lastIndex].id_user === newMessage.id_sender;

  const previousDate = new Date(updatedMessages[lastIndex].sendAt);

  const currentDate = new Date(newMessage.sendAt);
  const timeDifference =
    (currentDate.getTime() - previousDate.getTime()) / 60000;

  const isTheLastIndexRangeHour = timeDifference <= 1;

  const userMap: Record<string, UserInfo> = {};
  updatedMessages.forEach((group) => {
    if (!userMap[group.id_user]) {
      userMap[group.id_user] = group.user;
    }
  });

  if (lastIndexFromUser && isTheLastIndexRangeHour) {
    const group = updatedMessages[lastIndex];

    const messageExists = group.messages.some(
      (message) => message.id === newMessage.id
    );

    if (!messageExists) {
      group.messages.push({
        id: newMessage.id,
        message: newMessage.message,
      });
    }
  } else {
    const newGroup: GroupedMessagesType = {
      id_user: newMessage.id_sender,
      sendAt: newMessage.sendAt,
      messages: [
        {
          id: newMessage.id,
          message: newMessage.message,
        },
      ],
      user: userMap[newMessage.id_sender] || {
        name: "",
        username: "",
        about: "",
        profileUrl: "",
        backgroundUrl: "",
        id_user: newMessage.id_sender,
        createdAt: "",
      },
    };
    updatedMessages.push(newGroup);
  }

  return updatedMessages;
}
