export default class CustomerDto {
    id;
    fio;
    login;
    phoneNumber;
    additionalPhoneNumber;
    address;
    inn;
    kc;
    bik;
    constructor(model) {
        this.id = model.id;
        this.fio = model.fio;
        this.login = model.login;
        this.phoneNumber = model.phoneNumber;
        this.additionalPhoneNumber = model.additionalPhoneNumber;
        this.address = model.address;
        this.inn = model.inn;
        this.kc = model.kc;
        this.bik = model.bik;
    }
}
