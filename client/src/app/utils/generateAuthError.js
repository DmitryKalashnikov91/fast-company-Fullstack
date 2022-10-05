export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Проверьте правильность ввода Email или пароля";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        default:
            return "слишком много попыток входа. Попробуйте позже";
    }
}
