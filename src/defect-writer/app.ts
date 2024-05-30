export default {
    id: 'defect-writer' as const,
    name: 'Operation Defect Writer' as const,
    icon: 'save_as' as const,
    description: 'Writes provided list of defects' as const,
    overview: ({ text }: { text: string }) => [
        {
            label: 'Writes provided list of defects' as const,
            text: text,
        },
    ],
    options: [] as const,
};