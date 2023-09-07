import { randomUUID } from 'crypto';

const generateId = () => {
    const id = randomUUID();
    return id;
}

export default generateId;