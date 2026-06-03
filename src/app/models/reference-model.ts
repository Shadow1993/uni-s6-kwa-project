export interface ReferenceModel {
    id: number;
    label: string
}

export const statusReferences: ReferenceModel[] = [
    { id: 0, label: 'All' },
    { id: 1, label: 'New' },
    { id: 2, label: 'In progress' },
    { id: 3, label: 'Done' }
]

export const priorityReferences: ReferenceModel[] = [
    { id: 0, label: 'All' },
    { id: 1, label: 'Low' },
    { id: 2, label: 'Medium' },
    { id: 3, label: 'High' }
]