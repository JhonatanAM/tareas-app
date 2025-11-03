export type Note = { id: string; text: string };

export type Task = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    notes: Note[];
    completed: boolean;
};
