import Link from "next/link";

export default function SearchPageFooter() {
    return (
        <div className="search-footer">
            <ul>
                <li>
                    <Link href="/search/about">
                        <a>About</a>
                    </Link>
                </li>
                <li>•</li>
                <li style={{ cursor: "not-allowed", pointerEvents: "none" }}>
                    <Link href="/search/settings">
                        <a>Settings</a>
                    </Link>
                </li>
                <li>•</li>
                <li>
                    <Link href="/">
                        <a>zkNews</a>
                    </Link>
                </li>
            </ul>
        </div>
    );
}