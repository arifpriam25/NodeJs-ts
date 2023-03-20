
class ResponseData {
    resp = (code: number, message: string | null, data: unknown) => {
        if (data != Object && data instanceof Error) {
            const response = {
                code: code,
                message: message,
                data: data
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
