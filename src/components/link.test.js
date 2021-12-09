import { formatNavigations } from "./utils";

describe('utils', () => {
 test('formatNavigations adds @ links at the beginning', () => {
   expect(formatNavigations('jc')).toBe('@jc');
 });
});