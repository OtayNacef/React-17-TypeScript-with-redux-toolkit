interface Adress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
        lat: string;
        lng: string;
    };
}
interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    adress?: Adress;
    phone: string;
    website: string;
    company?: Company;
}
