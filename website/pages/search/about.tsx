import Link from "next/link";

import HeadMetadata from "@/components/HeadMetadata";
import SearchPageHeader from "@/components/search/SearchPageHeader";
import SearchPageFooter from "@/components/search/SearchPageFooter";

export default function About() {
    return (
        <div className="search-about-wrapper">
            <HeadMetadata title="Search About | zkNews" />
            <SearchPageHeader showBackButton={true} />
            <div className="search-about-content">
                <h3>About</h3>
                <p>
                    zkNews search provides real-time full-text search for the zkNews community website. The search
                    backend is implemented using{" "}
                    <Link href="http://www.algolia.com">
                        Algolia
                    </Link>{" "}
                    instant search engine.
                </p>
                <h3>How it works</h3>
                <p>
                    Items and comments are updated in real-time and indexed in the{" "}
                    <Link href="http://www.algolia.com">
                        Algolia
                    </Link>{" "}
                    search engine.
                </p>
                <h3>Credits</h3>
                <p>
                    <Link href="http://www.algolia.com">
                        Algolia
                    </Link>
                </p>
                <p>
                    <Link href="https://github.com/algolia/algoliasearch-client-javascript">
                        Algolia JavaScript API
                    </Link>
                </p>
                <p>
                    <Link href="https://news.ycombinator.com/">
                        Hacker News
                    </Link>
                </p>
            </div>
            <SearchPageFooter />
        </div>
    );
}
