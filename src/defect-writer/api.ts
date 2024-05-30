import { defineOperationApi } from "@directus/extensions-sdk";
import { useService } from "../utils";

export default defineOperationApi<Options>({
    id: "defect-writer",
    handler: async (_, context) => {
        const { logger, data } = context;
        const defectService = await useService('defect', context);

        const defects = data?.$last?.body || data?.$last;
        logger.info(`[Defect Writer] Start writing ${defects.length} defects`)

        let errors = 0;
        let rowsAdded = 0;

        for (let defect of defects) {
            try {
                const existingDefects = await defectService.readMany([defect.id]);
                if (!existingDefects[0]) {
                    logger.info('[NEW DEFECT] - ' + defect.id);
                    await defectService.createOne(defect);
                    rowsAdded += 1;
                }
            } catch (e) {
                errors += 1
                logger.error(e, `[Defect Writer] Error`)
            }
        }

        logger.info(`[Defect Writer] Completed; Errors: ${errors}; Rows Added: ${rowsAdded}`)
        return [];
    }
});

type Options = {};