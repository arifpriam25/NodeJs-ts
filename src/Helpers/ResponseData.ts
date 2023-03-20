
class ResponseData {
    resp = (code: number, message: string | null, data: unknown) => {
        if (data != Object && data instanceof Error) {
            const err = data as Error
            const response = {
                code: code,
                message: message,
                data: err.message
            }
            return response;
        }
        const res = {
            code,
            message,
            data: data
        };
        return res;
    }
}

export default new ResponseData
