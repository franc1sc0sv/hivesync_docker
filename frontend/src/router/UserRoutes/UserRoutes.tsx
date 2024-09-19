import { RouteObject } from "react-router-dom";
import { AuthDetector } from "../../components/auth/AuthDetector";

import { DirectMessagesPage } from "../../pages/User/DirectMessages/DM";
import { ChatPage } from "../../pages/User/Chat/ChatPage";
import { ComunityIndividualPage } from "../../pages/User/ComunityIndividual/ComunityIndividualPage";
import { ServerPage } from "../../pages/User/Servers/ServerPage";
import { ProfilePage } from "../../pages/User/Profile/Profile";
import { SettingsPage } from "../../pages/User/UserSettings/Settings";
import { NotificationsPage } from "../../pages/User/Notifications/NotificationsPage";
import { AIPage } from "../../pages/User/Tools/AIPage";
import TextEditorPage from "../../pages/User/Tools/documentsPage";
import { WhiteBoardPage } from "../../pages/User/Tools/WhiteBoard";
import { TranslatorPage } from "../../pages/User/Tools/TranslatorPage";


//no le hagan caso xd ay lo borro
import { TestingPage } from "../../pages/testing/TestingPage";
import { ComunityPage } from "../../pages/Home/Comunity/ComunityPage";

export const UserRoutes: RouteObject = {
  caseSensitive: true,
  path: "/app",
  element: <AuthDetector />,
  children: [
    { path: "@me", element: <DirectMessagesPage /> }, // Bandeja entrada DM
    { path: ":id", element: <ChatPage /> }, //Chats individuales
    { path: "test", element: <TestingPage /> },

    { path: "@notifications", element: <NotificationsPage /> }, //Notificaciones

    { path: "profile", element: <ProfilePage /> },
    { path: "profile/settings", element: <SettingsPage /> }, //ajustes del usuario

    { path: "communities/", element: <ComunityPage /> },
    { path: "comunity/:id", element: <ComunityIndividualPage /> },
    { path: ":id/:id", element: <ServerPage /> }, // Servers - /server_id/channel_id
    { index: true, element: <ServerPage /> }, // Servers - /server_id/channel_id


    { path: "ai", element: <AIPage /> },
    { path: "documents", element: <TextEditorPage /> },
    { path: "whiteboard", element: <WhiteBoardPage /> },
    { path: "translate", element: <TranslatorPage /> }



  ],
};
