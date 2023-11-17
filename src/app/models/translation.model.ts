export class Translation {
  public UserId!: string;
  public EntryId!: string;
  public LanguageCode!: string;
  public Content!: string;
  public Rate: number = 1;
  public TranslationId: string = crypto.randomUUID();
  public Notes?: string;
  public CreatedAt!: Date;
  public UpdatedAt!: Date;
}
