export interface ITranslation {
    UserId: string;
    EntryId: string;
    LanguageCode: string;
    Content: string;
    Rate: number;
    TranslationId: string;
    Notes?: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
