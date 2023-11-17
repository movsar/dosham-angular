import { UserRole } from "../enums/user-role.enum";
import { UserStatus } from "../enums/user-status.enum";
import { UserType } from "../enums/user-type.enum";
import { Entry } from "./entry.model";

export class User {
    Id: string = "";
    Email?: string | null;
    Password?: string | null;
    PasswordConfirmation?: string | null;
    Rate: number = 0;
    Patronymic?: string | null;
    FirstName?: string | null;
    LastName?: string | null;
    ImagePath?: string | null;
    Status: UserStatus = UserStatus.Undefined;
    Type: UserType = UserType.Regular;
    CreatedAt?: Date;
    UpdatedAt?: Date;

    constructor(userFromJson: User) {
        if (!userFromJson || !userFromJson.Id) {
            console.error("something went wrong while constructing the user object");
            return;
        }

        this.Id = userFromJson.Id;
        this.Email = userFromJson.Email;
        this.Rate = userFromJson.Rate;
        this.Patronymic = userFromJson.Patronymic;
        this.FirstName = userFromJson.FirstName;
        this.LastName = userFromJson.LastName;
        this.ImagePath = userFromJson.ImagePath;
        this.Status = userFromJson.Status;
        this.Type = userFromJson.Type;
        this.CreatedAt = userFromJson.CreatedAt;
        this.UpdatedAt = userFromJson.UpdatedAt;
    }

    get Role(): UserRole {
        return User.GetRoleByRate(this.Rate);
    }

    static GetRoleByRate(rate: number): UserRole {
        if (rate < UserRole.Member) {
            return UserRole.Member;
        } else if (rate < UserRole.Enthusiast) {
            return UserRole.Enthusiast;
        } else if (rate < UserRole.Contributor) {
            return UserRole.Contributor;
        } else if (rate < UserRole.Editor) {
            return UserRole.Editor;
        } else if (rate < UserRole.Maintainer) {
            return UserRole.Maintainer;
        } else {
            return UserRole.Undefined;
        }
    }

    public CanEdit(entityRate: number, entityUserId: string): boolean {
        if (this.Status != UserStatus.Active || (this.Role <= User.GetRoleByRate(entityRate) && !(this.Id == entityUserId))) {
            return false;
        }

        return true;
    }

    public CanRemove(entityRate: number, entityUserId: string, entityCreatedAt: Date): boolean {
        // Removal is allowed only for the authors and only within X hours and for moderators
        if (this.Status != UserStatus.Active || (this.Role <= User.GetRoleByRate(entityRate) && !(this.Id == entityUserId))) {
            return false;
        }

        // var timePassed = Date.UTC() - entityCreatedAt;
        // if ((timePassed.Hours < Constants.TimeInHrsToAllowForEntryRemoval) || Type == UserType.Moderator)
        // {
        //     return true;
        // }

        return false;
    }
    public CanAddSound(entry: Entry): boolean {
        if (this.Status !== UserStatus.Active) {
            return false;
        }

        const MaxSoundsPerEntry = 3;
        if (entry.Sounds.filter(s => s.Rate > 0).length >= MaxSoundsPerEntry) {
            return false;
        }

        return true;
    }

    public CanAddTranslation(entry: Entry, languageCode: string): boolean {
        if (this.Status != UserStatus.Active) {
            return false;
        }

        const MaxTranslationsPerEntry = 3;
        if (entry.Translations.filter(t => t.LanguageCode === languageCode && t.Rate > UserRole.Member).length >= MaxTranslationsPerEntry) {
            return false;
        }

        return true;
    }

    public CanPromote(rate: number, userId: string): boolean {
        if (this.Status != UserStatus.Active || (this.Id == userId) || this.Role <= User.GetRoleByRate(rate)) {
            return false;
        }

        return true;
    }
}
