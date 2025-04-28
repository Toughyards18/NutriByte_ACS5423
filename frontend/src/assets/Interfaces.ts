// file: src/assets/Interfaces.ts
// This file contains constants used throughout the application


export interface Nutrient {
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    nutrientUnit: string;
    amount: number;
}

export interface Food {
    fdcId: number;
    description: string;
    brandOwner?: string;
    ingredients?: string;
    servingSize: number;
    servingSizeUnit: string;
    nutrients: Nutrient[];
}