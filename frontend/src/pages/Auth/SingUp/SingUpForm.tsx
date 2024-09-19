import { InputsForms } from "../../../components/forms/Inputs/inputs";
import { PasswordInput } from "../../../components/forms/Inputs/PasswordInput";
import { SubmitButton } from "../../../components/forms/Inputs/Button";
import { Link } from "react-router-dom";
import { useCustomForm } from "../../../hooks/useForm";
import { api_register } from "../../../api/auth";

export const SingUpForm = () => {
  return (
    <>
      <Form />
      <FormFooter />
    </>
  );
};

const Form = () => {
  const { onSubmit, register, isLoading } = useCustomForm(
    api_register,
    () => {},
    "/"
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center w-full gap-5 text-custom_white"
    >
      <InputsForms
        register={register}
        title="Nombre"
        placeholder="nombre"
        type="text"
        name="name"
      />
      <InputsForms
        register={register}
        title="Usuario"
        placeholder="Usuario"
        type="text"
        name="username"
      />
      <InputsForms
        name="email"
        register={register}
        title="Email"
        placeholder="Email"
        type="text"
      />
      <PasswordInput register={register} />
      <SubmitButton isLoading={isLoading} text="Entra a Hivesync" />
    </form>
  );
};

const FormFooter = () => {
  return (
    <div className="flex flex-col items-center w-full gap-2 text-custom_white font-almarai hover:text-primary">
      <Link to="/login" className="text-custom_white">
        ¿Ya tienes cuenta? Inicia en HiveSync
      </Link>
      <Link to={"/recover"} className="text-custom_white">
        Olvidé mi contraseña
      </Link>
    </div>
  );
};
