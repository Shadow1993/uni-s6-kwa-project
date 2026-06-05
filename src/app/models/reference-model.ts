export interface ReferenceModel {
    id: number;
    label: string;
    color: string;
}

export const statusReferences: ReferenceModel[] = [
    { id: 0, label: 'All', color: '#ffffff' },
    { id: 1, label: 'New', color: '#9098c0' },
    { id: 2, label: 'In progress', color: '#2b93c4' },
    { id: 3, label: 'Done', color: '#4caf50' }
]

export const priorityReferences: ReferenceModel[] = [
    { id: 0, label: 'All', color: '#ffffff' },
    { id: 1, label: 'Low', color: '#ffc107' },
    { id: 2, label: 'Medium', color: '#ff9800' },
    { id: 3, label: 'High', color: '#f44336' }
]

export function findColorReference(forType: 'status' | 'priority', value: number): string {
    switch (forType) {
        case 'status':
            return statusReferences.find((v) => v.id === value)?.color || '#fff';
        case 'priority':
            return priorityReferences.find((v) => v.id === value)?.color || '#fff';
        default:
            return '#fff'
    }
}