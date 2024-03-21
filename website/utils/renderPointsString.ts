/**
 * Dumb function just because how stupid english is
 * @param string
 * @returns string
 */
export default function renderPointsString(points: number) {
    return Math.abs(Math.round(points)) === 1 ? "point" : "points";
}
