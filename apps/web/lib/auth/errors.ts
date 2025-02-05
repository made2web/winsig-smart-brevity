import { APIError } from "better-auth";

export default function parseAuthErrors({ error }: { error: APIError }) {
  if (!error.body) {
    console.log("error #unk88402", error);
    return "Ocorreu um erro desconhecido.";
  }
  const { code } = error.body;

  switch (code) {
    case "INVALID_USERNAME_OR_PASSWORD":
      return "Utilizador ou password incorretos.";
    case "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER":
      return "Utilizador já existe.";
    case "PASSWORD_TOO_SHORT":
      return "Password demasiado curta. Tem de ter no minimo 8 caracteres.";
    case "INVALID_TOKEN":
      return "Token inválido ou expirado.";
    case "USER_ALREADY_EXISTS":
      return "Já existe um utilizador com este email.";
    default:
      return `Ocorreu um erro: ${error.message}`;
  }
}
