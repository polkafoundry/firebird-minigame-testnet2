export default interface AuthServiceInterface {
    registerVerifyEmail({request, response}) : Promise<any>
    sendNewVerifyEmail(params): Promise<any>
    verification({ request, response }): Promise<any>
    isLinkedEmail({ request, response }): Promise<any>

  }
