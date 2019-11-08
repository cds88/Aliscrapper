export interface DataInterface{
    Records: Record[];
    isFetching: boolean;
}

export interface Record {
    id: number;
    name: string;
    seller: string;
    price: string;
    link: string;
    thumb: string;
    images: string;
    dateCreated: string;
    timeCreated: string;
    status: string;
    category: string;
    dateRequested: string;
    timeRequested: string;
    dateDeleted: string;
    timeDeleted: string;

}