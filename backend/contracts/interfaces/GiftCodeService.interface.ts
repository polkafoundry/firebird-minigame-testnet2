export default interface GiftCodeService {
  createCode({ request }): Promise<any>
  getCodeAvaiable({ request }): Promise<any>
  checkCodeInfo({ request }): Promise<any>
  getActiveCode({ request }): Promise<any>
  useCode({ request }): Promise<any>
}
