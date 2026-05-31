import { BaseModel } from "./base-model";

export interface TaskModel extends BaseModel {
    projectId: number;
    description: string;
    status: number;
    priority: number;
    userId: number;
}