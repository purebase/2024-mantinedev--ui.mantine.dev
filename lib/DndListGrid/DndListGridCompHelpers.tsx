export function reorderList({ current, from, to }: { current: any[], from: number; to: number }) {
    const cloned = [...current];
    const item = current[from];

    cloned.splice(from, 1);
    cloned.splice(to, 0, item);

    return cloned;
}
