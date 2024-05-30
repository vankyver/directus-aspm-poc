import { ItemsService } from "./types";

const useService = async (serviceName: string, context: any): Promise<ItemsService> => {
    const { database, services, accountability, getSchema } = context;
    const { ItemsService } = services;
    const schema = await getSchema();

    return new ItemsService(serviceName, { accountability, database, schema });
};

export { useService };
