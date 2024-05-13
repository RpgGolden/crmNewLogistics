export default class ProfileDto {
    id;
    name;
    surname;
    patronymic;
    phoneNumber;
    inn;
    additionalPhoneNumber;
    snils;
    passportSerial;
    passportNumber;
    passportIssueBy;
    passportIssueDate;
    passportCode;
    birthDate;
    addressReg;
    actualAdress;
    numberLicense;
    categoryLicense;
    periodLicense;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.surname = model.surname;
        this.patronymic = model.patronymic;
        this.phoneNumber = model.phoneNumber;
        this.inn = model.inn;
        this.additionalPhoneNumber = model.additionalPhoneNumber;
        this.snils = model.snils;
        this.passportSerial = model.passportSerial;
        this.passportNumber = model.passportNumber;
        this.passportIssueBy = model.passportIssueBy;
        this.passportIssueDate = model.passportIssueDate;
        this.passportCode = model.passportCode;
        this.birthDate = model.birthDate;
        this.addressReg = model.addressReg;
        this.actualAdress = model.actualAdress;
        this.numberLicense = model.numberLicense;
        this.categoryLicense = model.categoryLicense;
        this.periodLicense = model.periodLicense;
    }
}
