import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { GoDependabot } from "react-icons/go";
import { RiOpenaiFill } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";
import { PiPencilCircleLight } from "react-icons/pi";
import { PiHandWavingFill } from "react-icons/pi";
import useFakePages from "../../../../../../store/useFakePage";
import { MdOutlineTranslate } from "react-icons/md";

import { AIPage } from "../../../../../../pages/User/Tools/AIPage";
import TextEditorPage from "../../../../../../pages/User/Tools/documentsPage";
import { WhiteBoardPage } from "../../../../../../pages/User/Tools/WhiteBoard";
import { TranslatorPage } from "../../../../../../pages/testing/Tools/Translator";

interface ChannelProps {
  id: string | number;
  name: string;
  onClick: () => void;
  icon: IconType;
}

export const features = (): ChannelProps[] => {
  const { addFakePage } = useFakePages();
  // const navigate = useNavigate();
  return [
    {
      id: 1,
      name: "Hivesync X ChatGPT",
      onClick: () => addFakePage({ title: <GptHeader />, children: <AIPage /> }),
      icon: RiOpenaiFill,
    },
    {
      id: 2,
      name: "Hivesync Docs",
      onClick: () => addFakePage({ title: "Hivesync Docs", children: <TextEditorPage />}),
      icon: IoDocumentText,
    },
    {
      id: 3,
      name: "Hivesync Boards",
      onClick: () => addFakePage({ title: "Hivesync Boards", children: <WhiteBoardPage />}),
      icon: PiPencilCircleLight,
    },
    {
      id: 4,
      name: "Hivesync Translator",
      onClick: () => addFakePage({ title: "Hivesync Translate", children: <TranslatorPage />}),
      icon: MdOutlineTranslate,
    },
    {
      id: 5,
      name: "Hivesync Signs",
      onClick: () =>
        (window.open("https://hivesync-signs.vercel.app/", "_blank")),
      icon: PiHandWavingFill,
    },
  ];
};


const GptHeader = () => {
  return (
    <div className="w-fit mx-auto flex items-center gap-2">
      <RiOpenaiFill className="w-10 h-10 text-light_purple mr-2" />
      <h1 className="text-xl font-bold text-white">ChatGPT</h1>
    </div>
  )
}