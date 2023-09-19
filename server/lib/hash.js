import { createHash } from 'crypto';

export function hash(str) {
    return createHash('sha512', { encoding: 'utf8' }).update(str).digest('hex');
}