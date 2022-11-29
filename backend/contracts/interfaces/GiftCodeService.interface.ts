export default interface GiftCodeService {
  createCode({ request }): Promise<any>
  getCodeAvaiable({ request }): Promise<any>
  useCode({ request }): Promise<any>
}
