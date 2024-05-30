import { defineDisplay } from "@directus/extensions-sdk";
import DisplayComponent from "./display.vue";


export default defineDisplay({
    id: "repository-display",
    name: "Repository Display",
    icon: "open_in_new",
    description: "Display defects tags in a repository table",
    component: DisplayComponent,
    types: ['uuid', 'string', 'text', 'bigInteger', 'integer', 'decimal', 'float', 'alias', 'json', ],
    localTypes: ['m2m', 'm2o', 'o2m', 'translations', 'm2a', 'file', 'files'],
    options: null,
    fields: (_, { collection }) => {

        if (collection !== 'repository') return [];

        return [
            'summary',
            'severity',
            'category',
            'id',
        ]
    },
});