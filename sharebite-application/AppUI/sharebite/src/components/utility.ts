
// validation of password format
const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordRegex.test(password);
}

// validation of email format
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// validation of confirm password
const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
}

export { validatePassword, validateEmail, validateConfirmPassword}