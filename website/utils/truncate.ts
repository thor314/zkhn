function truncate(toLength: number) {
    return (string: string) => (string.length > toLength ? `${string.substring(0, toLength - 3)}...` : string);
}

export const truncateCommentText = truncate(80);
export const truncateItemTitle = truncate(50);
