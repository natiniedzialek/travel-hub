export class User {
    _id: string;
    userName: string;
    password: string;

    constructor(
        id: string,
        userName: string,
        password: string
    ) {
        this._id = id;
        this.userName = userName;
        this.password = password;
    }
}
