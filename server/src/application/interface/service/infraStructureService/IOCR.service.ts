export interface IOCRService {
    extractText(image:string):Promise<string>
}