export default class CustomerDto {
    id;
    fio;
    login;
    phoneNumber;
    additionalPhoneNumber;
    constructor(model) {
        this.id = model.id;
        this.fio = model.fio;
        this.login = model.login;
        this.phoneNumber = model.phoneNumber;
        this.additionalPhoneNumber = model.additionalPhoneNumber;
    }
}
