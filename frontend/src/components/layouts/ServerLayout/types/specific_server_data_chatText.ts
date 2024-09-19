import { MessageEnum } from "../Enums/SpecificServerChatText"

export type server_chatText_messages = {
    //a que specific channel pertenece el mensaje
    channelId: string
    //si es un componente con solo texto, o texto con imagen
    messageType: MessageEnum,
    user: string,
    //con Day.js convertirlo de segundos hasta hora o sino fecha 
    timeStamp:Number,
    icon: string,
    //tipar si el cuerpo del mensaje lleva imagen o no
    bodyMessage: bodyMessage[],
    idMessage: string,
}

export type bodyMessage = {
    description: string[]
    imageUrl?: string
}

export type server_chatText_messagesList = server_chatText_messages[]

