import Link from "next/link";
import Highlighter from "react-highlight-words";

import renderCreatedTime from "@/utils/renderCreatedTime";

export default function SearchItemComponent({ item, searchQuery }) {
    const highlightText = (text: string) => {
        return (
            <Highlighter
                searchWords={searchQuery ? searchQuery.trim().split(" ") : [""]}
                textToHighlight={text}
                highlightClassName="search-highlighted-text"
            />
        );
    };

    const renderItemFormattedText = (item) => {
        let textToRender;

        if (item._highlightResult && item._highlightResult.text.matchedWords.length) {
            textToRender = item._highlightResult.text.value;
        } else {
            textToRender = item.text;
        }

        return <span dangerouslySetInnerHTML={{ __html: textToRender }}></span>;
    };

    return (
        <div className="search-results-item">
            <div className="search-results-item-data">
                <div className="search-results-item-title-and-link">
                    <Link href={`/item?id=${item.objectID}`} className="search-results-item-title">
                        {highlightText(item.title)}
                    </Link>
                    {item.url ? (
                        (<Link href={item.url} className="search-results-item-link">
                            ({highlightText(item.url)})
                        </Link>)
                    ) : null}
                </div>
                <div className="search-results-item-details">
                    <span>
                        <Link href={`/item?id=${item.objectID}`}>

                            {item.points.toLocaleString()} {item.points === 1 ? "point" : "points"}

                        </Link>
                    </span>
                    <span className="search-results-item-details-separator">|</span>
                    <span>
                        <Link href={`/user?id=${item.by}`}>
                            {highlightText(item.by)}
                        </Link>
                    </span>
                    <span className="search-results-item-details-separator">|</span>
                    <span>
                        <Link href={`/item?id=${item.objectID}`}>
                            {renderCreatedTime(item.created)}
                        </Link>
                    </span>
                    <span className="search-results-item-details-separator">|</span>
                    <span>
                        <Link href={`/item?id=${item.objectID}`}>
                            {item.commentCount.toLocaleString()}comments
                        </Link>
                    </span>
                </div>
                {item.text ? <div className="search-results-item-text">{renderItemFormattedText(item)}</div> : null}
            </div>
        </div>
    );
}
