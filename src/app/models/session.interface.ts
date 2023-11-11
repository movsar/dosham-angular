import { SessionStatus } from "../enums/session.enum"
import { IUser } from "./user-dto.interface"

export interface ISessionInformation {
    AccessToken: string,
    RefreshToken: string,
    Status: SessionStatus,
    UserDto: IUser
};