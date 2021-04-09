export class AddBookOwnershipDto {
  public bookId: string;

  public bought?: boolean;
  public signed?: boolean;
  public lent?: boolean;

  public dateAcquired?: Date;
  public dateRead?: Date;
}
