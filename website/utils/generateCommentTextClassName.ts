/**
 * @returns string: className of the faded text
 */
export default function generateCommentTextClassName(points: number) {
    return `comment-section-comment-text ${points < 0 ? `faded-level-${Math.abs(Math.round(points))}` : ""}`;
}
