export const ACCOUNT_PATH = "/conta";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/registo";
export const RECOVER_PASSWORD_PATH = "/recuperar-password";
export const RESET_PASSWORD_PATH = "/reset-password";

export const FORM_ERRORS = {
  fields: {
    name: {
      required: "Nome é obrigatório",
    },
    email: {
      required: "Email é obrigatório",
      invalid: "Email inválido",
    },
    username: {
      required: "Username é obrigatório",
    },
    password: {
      required: "Password é obrigatória",
      tooShort: "Password deve ter pelo menos 8 caracteres",
      tooLong: "Password deve ter no máximo 128 caracteres",
    },
  },
};
