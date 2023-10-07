export interface Note {
    id: string;
    index?: string;
    name: string;
    type: string;
}
export interface Chord {
    id?: string;
    name: string;
    notes: Note[];
    user_id?: string;
}

export interface User {
    uid: string;
    email: string;
    display_name: string;
}
