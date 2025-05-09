export interface ResponseError {
  code?: string | number | object; // Tipe lebih spesifik
  message_title: string;
  message: string;
  message_severity: string;
  action?: string | object; // Tipe lebih spesifik untuk action
  show_error_image?: boolean;
}
