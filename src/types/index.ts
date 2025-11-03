export type Note = { id: string; text: string };

export type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    notes: Note[];
    history: { date: string; status: string }[];
    completed: boolean;
};
