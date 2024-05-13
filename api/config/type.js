import { mapObjectKeys } from '../utils/map.js';

const type = {
    'Тентовый 5т': 1,
    Контейнер: 2,
    'Микро автобус': 3,
    'Газель 6м': 4,
    'Еврофура 82м': 5,
};

export default type;

export const map = mapObjectKeys(type);
