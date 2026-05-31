import { BaseModel } from "./base-model";

export interface ProjectModel extends BaseModel {
    name: string;
    description: string;
    deadline: string;
    userId: number;
}