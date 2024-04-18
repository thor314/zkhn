import formatDate from "@/utils/date/formatDate";

const timeUnits = [
    { max: 60, divisor: 1, label: "second" },
    { max: 3600, divisor: 60, label: "minute" },
    { max: 3600 * 24, divisor: 3600, label: "hour" },
    { max: 3600 * 24 * 365, divisor: 86400, label: "day"},
];

function pluralize(word: string, val: number) {
    return word + (val === 1 ? '' : 's');
}

// Replaces renderCreatedTime(timestamp) util
export default function formatAge(timestamp: string) {
    const seconds = Math.floor((Date.now() - Date.parse(timestamp)) / 1000);
    const timeUnit = timeUnits.find(({ max }) => seconds < max);
    if (!timeUnit) {
        return `on ${formatDate(new Date(timestamp))}`;
    } else {
        const { divisor, label } = timeUnit;
        const val = Math.floor(seconds / divisor);
        return `${val} ${pluralize(label, val)} ago`;
    }
}
