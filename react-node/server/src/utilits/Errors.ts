

export const apiSuccess = (message: String, data: any, response: any) => {
    response.status(200).send({
        isError: false,
        data: data,
        message: message
    })
    response.end();
}

export const apiError = (response, message = "Error occured") => {
    response.status(400).json({
        isError: true,
        data: null,
        message
    })
    response.end();
}

export const apiAuthrizationError = (response: any) => {
    response.status(401).json({
        isError: true,
        data: null,
        message: "Invalid Token"
    })

}









