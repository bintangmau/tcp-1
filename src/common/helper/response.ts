export class ResponseHelper {
  public static error(statusCode : number, message : string, detail : string ) {
    return {
      statusCode: statusCode,
      message: message,
      detail: detail
    }
  }
  public static success(statusCode : number, message : string, data : object ) {
    return {
      statusCode: statusCode,
      message: message,
      data: data
    }
  }
}