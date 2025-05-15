export class ErrorResponseDTO {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  code?: string;
  message: string[];
}
