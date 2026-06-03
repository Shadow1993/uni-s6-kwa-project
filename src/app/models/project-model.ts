import { BaseModel } from "./base-model";
import { UserModel } from "./user-model";

export interface ProjectModel extends BaseModel {
    name: string;
    description: string;
    deadline: string;
    userId: number;
    user?: UserModel;
}