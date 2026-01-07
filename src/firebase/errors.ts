export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public context: SecurityRuleContext;
  private customMessage?: string;

  constructor(context: SecurityRuleContext, message?: string) {
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    this.customMessage = message;
    // This is to make the error object serializable for the Next.js error overlay.
    // The default Error object is not serializable.
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }

  public toString() {
    if (this.customMessage) {
      return `FirestorePermissionError: ${this.customMessage}`;
    }
    return `FirestorePermissionError: Missing or insufficient permissions.`;
  }
}
