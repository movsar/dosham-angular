import { SessionStatus } from "../enums/session.enum"
import { User } from "./user.model"

export interface ISessionInformation {
    AccessToken: string,
    RefreshToken: string,
    Status: SessionStatus,
    User: User
};