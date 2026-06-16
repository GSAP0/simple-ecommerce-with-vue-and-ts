export interface AppError extends Error {
  statusCode: number
}

export function createError(statusCode: number, message?: string): AppError {
  const error = new Error(message ?? `Error ${statusCode}`) as AppError
  error.statusCode = statusCode
  return error
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof Error && typeof (error as AppError).statusCode === 'number'
}
