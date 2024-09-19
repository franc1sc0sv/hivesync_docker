import { GeneralLayout } from "../../../components/layouts/GeneralLayout/GeneralLayout";
import { ServerProvider } from "../../../components/layouts/ServerLayout/Context/ServerContext.js";
import { ServerLayout } from "../../../components/layouts/ServerLayout/ServerLayout.jsx";

export const ServerPage = () => {
  return (
    <GeneralLayout showHeader={false}>
      <ServerProvider>
        <ServerLayout />
      </ServerProvider>
    </GeneralLayout>
  );
};
