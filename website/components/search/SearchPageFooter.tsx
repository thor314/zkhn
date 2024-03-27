import Link from "next/link";

export default function SearchPageFooter() {
    return (
        <div className="search-footer">
            <ul>
                <li>
                    <Link href="/search/about">
                        About
                    </Link>
                </li>
                <li>•</li>
                <li style={{ cursor: "not-allowed", pointerEvents: "none" }}>
                    <Link href="/search/settings">
                        Settings
                    </Link>
                </li>
                <li>•</li>
                <li>
                    <Link href="/">
                        zkNews
                    </Link>
                </li>
            </ul>
        </div>
    );
}
