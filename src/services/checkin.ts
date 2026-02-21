export class ApiError extends Error {
  code: string;
  status: number;
  userMessage: string;
  details?: unknown;

  constructor({ code, status, message, userMessage, details }: { code: string; status: number; message: string; userMessage: string; details?: unknown }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.userMessage = userMessage;
    this.details = details;
  }
}
