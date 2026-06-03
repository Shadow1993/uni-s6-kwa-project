import { BaseModel } from "./base-model";
import { UserModel } from "./user-model";

export interface TaskModel extends BaseModel {
    projectId: number;
    description: string;
    status: number;
    priority: number;
    userId: number;
    user?: UserModel;
}