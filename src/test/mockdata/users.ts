import { User } from "../../misc/type";

export const usersList: User[] = [
    {
        id: 1,
        email: "john@mail.com",
        password: "changeme",
        name: "Jhon",
        role: "customer",
        avatar: "https://i.imgur.com/LDOO4Qs.jpg"
    },
    {
        id: 2,
        email: "maria@mail.com",
        password: "12345",
        name: "Maria",
        role: "customer",
        avatar: "https://i.imgur.com/DTfowdu.jpg"
    }
];

export const newUser: User = {
    id: 5,
    email: "viktoriiashtyreva@mail.com",
    password: "viktoria24",
    role: "customer",
    name: "Viktoriia Shtyreva",
    avatar: "avatar.com",
};