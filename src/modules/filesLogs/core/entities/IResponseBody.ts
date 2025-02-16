export interface IResponseBody {
    details: {
        error_file_name: string;
        fail_rows: number;
        processed_rows: number;
    };
    message: string;
    status: string;
}