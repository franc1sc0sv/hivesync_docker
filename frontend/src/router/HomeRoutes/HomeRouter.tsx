import { RouteObject } from "react-router-dom";

import { IndexPage } from "../../pages/Home/Index/IndexPage";
import { ComunityPage } from "../../pages/Home/Comunity/ComunityPage";
import { ComunityIndividualPage } from "../../pages/Home/ComunityIndividual/ComunityIndividualPage";
import { LoginPage } from "../../pages/Auth/Login/LoginPage";
import { SingUpPage } from "../../pages/Auth/SingUp/SingUpPage";
import { RecoverPage } from "../../pages/Auth/Recover/RecoverPage";
import { UnsecureRoutes } from "../../components/auth/UnsecureRoutes";
import { IaTesting } from "../../pages/testing/ia/iaTesting";
import Docs from "../../pages/testing/Tools/Docs";
import Excalidraw from "../../pages/testing/Tools/Excalidraw";
import BlackBoard from "../../pages/testing/Tools/BlackBoard";
// import { PageChannelTesting } from "../../pages/testing/channel/pageChannelTesting";
import { TranslatorPage } from "../../pages/testing/Tools/Translator";
import { ChangeAvatarModal } from "../../pages/testing/imgPicker";
import { ResetPasswordPage } from "../../pages/Auth/Recover/ResetPassword";

export const HomeRoutes: RouteObject = {
  caseSensitive: true,
  path: "/",
  element: <UnsecureRoutes />,
  children: [
    { index: true, element: <IndexPage /> },

    { path: "/comunity", element: <ComunityPage /> },
    { path: "/comunity/:id", element: <ComunityIndividualPage /> },

    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SingUpPage /> },
    { path: "/recover", element: <RecoverPage /> },
    { path: "/reset-password", element: <ResetPasswordPage /> },

    //testing
    { path: "/iaTesting", element: <IaTesting /> },
    { path: "/docs", element: <Docs /> },
    { path: "/blackBoard", element: <BlackBoard /> },
    { path: "/excaliDraw", element: <Excalidraw/> },
    //{ path: "/videocalls", element: <PageChannelTesting/> },
    { path: "/translate", element: <TranslatorPage /> },
    { path: "/img", element: <ChangeAvatarModal /> },


    

  ],
};
