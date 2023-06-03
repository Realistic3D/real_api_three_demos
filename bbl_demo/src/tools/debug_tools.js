
export function ErrorResponse(message) {
    console.log('%c' + message, 'color: red; font-size: 16px; font-weight: bold;');
    return 0;
}

export function ErrorInfo(message) {
    console.log('%c' + message, 'color: red; font-size: 16px;');
    return 0;
}
