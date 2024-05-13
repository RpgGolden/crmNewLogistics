import { mapObjectKeys } from '../utils/map.js';

const roles = {
    Создан: 1,
    Подтвержден: 2,
    Отклонен: 3,
    Завершен: 4,
};

export default roles;

export const map = mapObjectKeys(roles);
