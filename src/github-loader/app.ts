export default {
    id: 'github-loader' as const,
    name: 'Github repositories Loader' as const,
    icon: 'camping' as const,
    description: 'Loads repositories from Github' as const,
    overview: ({ text }: { text: string }) => [
        {
            label: 'Loads repositories from Github' as const,
            text: text,
        },
    ],
    options: [] as const,
};