export const makeResponse = (message:any, data = []) => {
    let response = new Object();
    response = {
        success: true,
        data: data,
        message: message,
    };
    return response;
};

export const makeTokenResponse = (message:any, data = [], tokens:any) => {
    let response = new Object();
    response = {
        success: true,
        data: data,
        message: message,
        token: tokens,
    };
    return response;
};

export const makeErrorResponse = (message:any, error:any) => {
    let response = new Object();
    response = {
        success: false,
        message: message,
        error: error
    }
    return response
}