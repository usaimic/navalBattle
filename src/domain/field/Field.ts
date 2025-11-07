export type fieldCell = {
    status: fieldStatus,
    shipId: number | null
} 

export type fieldStatus = 'free' | 'placed' | 'hitted' | 'miss' | 'fill' | 'picked';

export type Field = fieldCell[][];