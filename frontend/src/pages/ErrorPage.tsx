import { useNavigate, useRouteError } from "react-router-dom";

type Props = {
  error: unknown;
};

const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <p className="text-lg text-custom_white">
      {(error as Error)?.message ||
        (error as { statusText?: string })?.statusText}
    </p>
  );
};

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-overlay_1">
      <div className="p-8 text-center bg-overlay_1 rounded-lg shadow-primary shadow-md">
        <h1 className="text-6xl font-bold text-custom_white mb-2">404</h1>
        <p className="text-xl text-custom_white">
          ¡Oops! La página que buscas no se encuentra.
        </p>

        <ErrorMessage error={error} />
        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded-full hover:bg-custom_white hover:text-overlay_1 transition duration-300"
          onClick={() => navigate("/")}
        >
          Volver Atrás
        </button>
      </div>
    </div>
  );
};
export default Error;
