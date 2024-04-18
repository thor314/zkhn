// Replaces moment.Moment.format("MMM D, YYYY")
export default function formatDate(date: Date) {
    return date.toLocaleDateString('en-US', {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}
