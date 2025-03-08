interface SuccessResponse<T = any> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
}

export function createSuccessResponse<T>(
  status: number,
  message: string,
  data?: T,
): SuccessResponse<T> {
  return {
    success: true,
    status,
    message,
    ...(data !== undefined && { data }),
  };
}
