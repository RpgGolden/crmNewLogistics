export default class CustomerDto {
    id;
    nameCompany;
    fio;
    login;
    phoneNumber;
    additionalPhoneNumber;
    address;
    inn;
    kc;
    bik;
    kpp;
    constructor(model) {
        this.id = model.id;
        this.nameCompany = model.nameCompany;
        this.fio = model.fio;
        this.login = model.login;
        this.phoneNumber = model.phoneNumber;
        this.additionalPhoneNumber = model.additionalPhoneNumber;
        this.address = model.address;
        this.inn = model.inn;
        this.kc = model.kc;
        this.bik = model.bik;
        this.kpp = model.kpp;
    }
}
