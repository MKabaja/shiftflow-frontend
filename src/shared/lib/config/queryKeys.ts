export const queryKeys = {
  auth: { me: ['auth', 'me'] as const },
  schedules: {
    all: ['schedules'] as const,
    list: (filters: Record<string, unknown>) => ['schedules', 'list', filters] as const,
    detail: (id: number) => ['schedules', 'detail', id] as const,
  },
};
