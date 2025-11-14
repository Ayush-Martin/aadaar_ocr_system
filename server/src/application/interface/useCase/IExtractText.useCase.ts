export interface IExtractTextUseCase {
    execute(image: string): Promise<string>;
}