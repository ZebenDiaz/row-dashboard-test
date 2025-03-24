export const generateUniqueId = (): string => {
  return `id-${Math.random().toString(36).substr(2, 9)}`;
};

export const updateProductRows = (rows: any[], updatedRow: any): any[] => {
  return rows.map(row => row.id === updatedRow.id ? updatedRow : row);
};

export const alignTemplate = (alignment: 'left' | 'center' | 'right'): string => {
  switch (alignment) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return '';
  }
};