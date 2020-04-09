export function validateForm(name: string, value: string) {
    const errorInfo = {
        error: false,
        errorMessage: ''
    }
    if(name) {
        switch (name) {
            case 'email':
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    errorInfo.error = true
                    errorInfo.errorMessage = 'Incorrect email address'
                    return errorInfo;
                }
                break
            case 'password':
                if (!/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/.test(value)) {
                    errorInfo.error = true
                    errorInfo.errorMessage = 'Not strong password'
                    return errorInfo;
                }
                break
            case 'username':
                if (!/^[a-z0-9_-]{3,16}$/.test(value)) {
                    errorInfo.error = true
                    errorInfo.errorMessage = 'Incorrect username'
                    return errorInfo;
                }
                break
            default:
                return errorInfo;

        }
    }
    return errorInfo;
}
