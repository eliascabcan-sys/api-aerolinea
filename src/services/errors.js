// Error de negocio con código HTTP sugerido (el servicio no conoce req/res).
export class BusinessError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}
