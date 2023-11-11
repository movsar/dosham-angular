import { UserStatus } from "../enums/user-status.enum";
import { UserType } from "../enums/user-type.enum";

export interface IUser {
    Id: string;
    Email?: string | null;
    Password?: string | null;
    PasswordConfirmation?: string | null;
    Rate: number;
    Patronymic?: string | null;
    FirstName?: string | null;
    LastName?: string | null;
    ImagePath?: string | null;
    Status: UserStatus;
    Type: UserType;
    CreatedAt: Date;
    UpdatedAt: Date;
}