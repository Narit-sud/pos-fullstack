export class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: T;
    constructor(success: boolean, message: string, data?: T, error?: T) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}
