import type { Query } from "@directus/types";

// Directus not exported types
export type Options = {};

export type ItemsService = {
    readByQuery: (query: Query) => Promise<any>;
    readMany: (keys: any[]) => Promise<any>;
    createOne: (data: any) => Promise<any>;
    updateOne: (data: any) => Promise<any>;
    upsertOne: (data: any) => Promise<any>;
    upsertMany: (data: any) => Promise<any>;
};

