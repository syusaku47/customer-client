export const urlFormat = (param?: string | number) => (param || param === 0 || param === '0' ? `/${param}` : '');
