import { z } from "zod";

export const UserInputInfo = z.object({
  id_user: z.string({ required_error: "id requerido" }).uuid(),
  username: z
    .string({ required_error: "username requerido" })
    .min(2, { message: "username  min length" }),
  name: z
    .string({ required_error: "name requerido" })
    .min(2, { message: "name  min length" }),
});

export const UserInput = z.object({
  username: z
    .string({ required_error: "username requerido" })
    .min(2, { message: "username  min length" }),
});

export const ColorInputSc = z
  .string()
  .regex(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Debe ser un color hexadecimal válido",
  });

  export const Username_about_meSc = z.object({
    username: z
      .string({ required_error: "username requerido" })
      .min(2, { message: "username  min length" }),
      about: z
      .string({ required_error: "username requerido" })
      .min(2, { message: "username  min length" }),
  });
