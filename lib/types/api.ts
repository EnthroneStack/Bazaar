export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  message?: string;
  error: {
    code?: string;
    message: string;
  } | null;
};
