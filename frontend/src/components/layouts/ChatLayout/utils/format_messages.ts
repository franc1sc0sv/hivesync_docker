export function groupMessages({
  messages,
}: {
  messages: Message[];
}): GroupedMessagesTypeArray {
  if (messages.length === 0) return [];

  const groupedMessages = [];
  let currentGroup: GroupedMessagesType = {
    id_user: messages[0].id_sender,
    sendAt: messages[0].sendAt,
    messages: [{ id: messages[0].id, message: messages[0].message }],
  };

  for (let i = 1; i < messages.length; i++) {
    const currentMessage = messages[i];
    const previousDate = new Date(currentGroup.sendAt);
    const currentDate = new Date(currentMessage.sendAt);
    const timeDifference =
      (currentDate.getTime() - previousDate.getTime()) / 60000;

    if (
      currentMessage.id_sender === currentGroup.id_user &&
      timeDifference <= 1
    ) {
      currentGroup.messages.push({
        id: currentMessage.id,
        message: currentMessage.message,
      });
    } else {
      groupedMessages.push(currentGroup);
      currentGroup = {
        id_user: currentMessage.id_sender,
        sendAt: currentMessage.sendAt,
        messages: [{ id: currentMessage.id, message: currentMessage.message }],
      };
    }
  }

  groupedMessages.push(currentGroup);

  return groupedMessages;
}
