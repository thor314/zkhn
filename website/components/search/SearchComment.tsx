import Link from "next/link";
import Highlighter from "react-highlight-words";

import renderCreatedTime from "@/utils/renderCreatedTime";
import { truncateItemTitle } from "@/utils/truncate";

export default function SearchCommentComponent({ comment, searchQuery }) {
    const highlightText = (text: string) => {
        return (
            <Highlighter
                searchWords={searchQuery ? searchQuery.trim().split(" ") : [""]}
                textToHighlight={text}
                highlightClassName="search-highlighted-text"
            />
        );
    };

    const renderCommentFormattedText = (comment) => {
        let textToRender;

        if (comment._highlightResult && comment._highlightResult.text.matchedWords.length) {
            textToRender = comment._highlightResult.text.value;
        } else {
            textToRender = comment.text;
        }

        return <span dangerouslySetInnerHTML={{ __html: textToRender }}></span>;
    };

    return (
        <div className="search-results-comment">
            <div className="search-results-comment-details">
                <span>
                    <Link href={`/user?id=${comment.by}`}>
                        {highlightText(comment.by)}
                    </Link>
                </span>
                <span className="search-results-comment-details-separator">|</span>
                <span>
                    <Link href={`/comment?id=${comment.objectID}`}>
                        {renderCreatedTime(comment.created)}
                    </Link>
                </span>
                <span className="search-results-comment-details-separator">|</span>
                <Link href={comment.isParent ? `/item?id=${comment.parentItemId}` : `/comment?id=${comment.objectID}`}>
                    parent
                </Link>
                <span className="search-results-comment-details-separator">|</span>
                <span>
                    on:&nbsp;
                    <Link href={`/item?id=${comment.parentItemId}`}>
                        {highlightText(truncateItemTitle(comment.parentItemTitle))}
                    </Link>
                </span>
            </div>
            <div className="search-results-comment-text">{renderCommentFormattedText(comment)}</div>
        </div>
    );
}
