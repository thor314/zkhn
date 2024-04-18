import { useState, type ChangeEventHandler } from "react";
import Link from "next/link";
import Router from "next/router";
import { isErrorFromAlias } from "@zodios/core";

import apiClient from "@/zodios/apiClient";
import { type ItemData } from "@/zodios/utilities/schemas";

import addNewComment from "@/api/comments/addNewComment";
import killItem from "@/api/moderation/killItem";
import unkillItem from "@/api/moderation/unkillItem";

import formatAge from "@/utils/date/formatAge";

type ItemComponentProps = {
    item: ItemData & {
        editAndDeleteExpired: boolean | null,
        favoritedByUser: boolean | null,
        unvoteExpired: boolean | null,
        votedOnByUser: boolean | null,
    },
    currUsername: string | null,
    goToString: string,
    userSignedIn: boolean,
    isModerator: boolean,
}

export default function ItemComponent({ item, currUsername, goToString, userSignedIn, isModerator }: ItemComponentProps) {
    const [loading, setLoading] = useState(false);
    const [numOfVote, setNumOfVote] = useState(item.points);
    const [commentInputValue, setCommentInputValue] = useState("");
    const [error, setError] = useState({
        commentTextTooLongError: false,
        commentTextRequiredError: false,
        commentSubmitError: false,
    });

    const requestVoteChange = async () => {
        if (loading) return;

        if (!userSignedIn) {
            Router.push(`/login?goto=${encodeURIComponent(goToString)}`);
        } else {
            setLoading(true);
            item.votedOnByUser = !item.votedOnByUser;
            try {
                const res = await apiClient.updateItemVote({
                    contentId: item.id,
                    voteState: "Upvote",
                });
                setLoading(false);
                setNumOfVote(numOfVote + (res === 'Upvote' ? 1 : -1));
            } catch (error) {
                if (isErrorFromAlias(apiClient.api, "updateItemVote", error) && error.response.data.code === 401) {
                    Router.push(`/login?goto=${encodeURIComponent(goToString)}`);
                } else {
                    // TODO: handle 400 payload parsing failed
                    setLoading(false);
                    item.votedOnByUser = !item.votedOnByUser;
                    console.error(error);
                }
            }
        }
    }

    const requestFavoriteChange = async () => {
        if (loading) return;

        if (!userSignedIn) {
            Router.push(`/login?goto=${encodeURIComponent(goToString)}`);
        } else {
            setLoading(true);
            try {
                await apiClient.updateItemFavorite({
                    id: item.id,
                    favorite: 'favorite',
                });
                Router.push(`/favorites?id=${currUsername}`);
            } catch (error) {
                if (isErrorFromAlias(apiClient.api, "updateItemFavorite", error) && error.response.data.code === 401) {
                    Router.push(`/login?goto=${encodeURIComponent(goToString)}`);
                } else {
                    // TODO: handle 403 forbidden and 422 invalid payload
                    console.error(error);
                    Router.push(Router.asPath);
                }
            }
        }
    }

    const updateCommentInputValue: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setCommentInputValue(event.target.value);
    };

    const requestAddNewComment = () => {
        if (loading) return;

        if (!userSignedIn) {
            Router.push(`/login?goto=${encodeURIComponent(goToString)}`);
        } else if (!commentInputValue) {
            setError({
                commentTextRequiredError: true,
                commentTextTooLongError: false,
                commentSubmitError: false,
            });
        } else if (commentInputValue.length > 5000) {
            setError({
                commentTextRequiredError: false,
                commentTextTooLongError: true,
                commentSubmitError: false,
            });
        } else {
            setLoading(true);

            const commentData = {
                parentItemId: item.id,
                isParent: true,
                parentCommentId: null,
                text: commentInputValue,
            };

            addNewComment(commentData, (response) => {
                setLoading(false);
                if (response.authError) {
                    Router.push(`/login?goto=${encodeURIComponent(goToString)}`);
                } else if (response.textRequiredError) {
                    setError({
                        commentTextRequiredError: true,
                        commentTextTooLongError: false,
                        commentSubmitError: false,
                    });
                } else if (response.textTooLongError) {
                    setError({
                        commentTextRequiredError: false,
                        commentTextTooLongError: true,
                        commentSubmitError: false,
                    });
                } else if (response.submitError || !response.success) {
                    setError({
                        commentTextRequiredError: false,
                        commentTextTooLongError: false,
                        commentSubmitError: true,
                    });
                } else {
                    setCommentInputValue("");
                    Router.push(Router.asPath);
                }
            });
        }
    };

    const requestKillItem = () => {
        if (loading) return;

        setLoading(true);

        killItem(item.id, (_response) => {
            setLoading(false);
            Router.push(Router.asPath);
        });
    };

    const requestUnkillItem = () => {
        if (loading) return;

        setLoading(true);

        unkillItem(item.id, (_response) => {
            setLoading(false);
            Router.push(Router.asPath);
        });
    };

    return (
        <div className="item-details">
            <table>
                <tbody>
                    <tr>
                        <td valign="top">
                            {/* VOTE BUTTON */}
                            {item.username === currUsername ? (
                                <div className="item-star">
                                    <span>*</span>
                                </div>
                            ) : null}
                            {item.username !== currUsername ? (
                                <>
                                    {item.votedOnByUser || item.dead ? (
                                        <span className="item-upvote hide"></span>
                                    ) : (
                                        <span className="item-upvote" onClick={requestVoteChange}></span>
                                    )}
                                </>
                            ) : null}
                        </td>
                        <td>
                            {/* IS ITEM DEAD? */}
                            <span className="item-title">
                                <Link href={item.url ? item.url : `/item?id=${item.id}`}>
                                    {item.dead ? "[dead] " : null}
                                    {item.title}
                                </Link>
                            </span>
                            {item.url ? (
                                <span className="item-domain">
                                    (<Link href={`/from?site=${item.domain}`} legacyBehavior>{item.domain}</Link>)
                                </span>
                            ) : null}
                        </td>
                    </tr>
                    <tr className="item-details-bottom">
                        <td colSpan={1}></td>
                        <td>
                            {/* ITEM POINTS | NUM OF VOTE */}
                            <span>
                                {numOfVote.toLocaleString()} {numOfVote === 1 ? "point" : "points"}
                            </span>
                            &nbsp;
                            {/* ITEM MADE BY */}
                            <span>
                                by <Link href={`/user?id=${item.username}`} legacyBehavior>{item.username}</Link>
                                &nbsp;
                            </span>
                            {/* ITEM CREATED DATE */}
                            <span>
                                <Link href={`/item?id=${item.id}`} legacyBehavior>{formatAge(item.created)}</Link>
                            </span>
                            {/* UNVOTE */}
                            {item.votedOnByUser && !item.unvoteExpired && !item.dead ? (
                                <>
                                    <span> | </span>
                                    <span className="item-unvote" onClick={requestVoteChange}>
                                        un-vote
                                    </span>
                                </>
                            ) : null}
                            {/* SEARCH SIMILAR ITEM */}
                            <span> | </span>
                            <span>
                                <Link href={`/search?q=${item.title}`}>past</Link>
                            </span>
                            <span> | </span>
                            <span>
                                <Link href={`https://www.google.com/search?q=${item.title}`}>web</Link>
                            </span>
                            {/* FAVORITE THIS ITEM? */}
                            {!item.favoritedByUser ? (
                                <>
                                    <span> | </span>
                                    <span className="item-favorite" onClick={requestFavoriteChange}>
                                        favorite
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span> | </span>
                                    <span className="item-favorite" onClick={requestFavoriteChange}>
                                        un-favorite
                                    </span>
                                </>
                            )}
                            {/* AUTHOR? EDIT THIS ITEM */}
                            {item.username === currUsername && !item.editAndDeleteExpired && !item.dead ? (
                                <>
                                    <span> | </span>
                                    <span className="item-edit">
                                        <Link href={`/edit-item?id=${item.id}`}>edit</Link>
                                    </span>
                                </>
                            ) : null}
                            {/* AUTHOR? DELETE ITEM */}
                            {item.username === currUsername && !item.editAndDeleteExpired && !item.dead ? (
                                <>
                                    <span> | </span>
                                    <span className="item-delete">
                                        <Link
                                            href={`/delete-item?id=${item.id}&goto=${encodeURIComponent(goToString)}`}
                                        >
                                            delete
                                        </Link>
                                    </span>
                                </>
                            ) : null}
                            {/* MOD? KILL ITEM */}
                            {isModerator && !item.dead ? (
                                <>
                                    <span> | </span>
                                    <span className="item-kill" onClick={requestKillItem}>
                                        kill
                                    </span>
                                </>
                            ) : null}
                            {/* MOD? UNKILL ITEM */}
                            {isModerator && item.dead ? (
                                <>
                                    <span> | </span>
                                    <span className="item-kill" onClick={requestUnkillItem}>
                                        un-kill
                                    </span>
                                </>
                            ) : null}
                            {/* COMMENT SECTION */}
                            {!item.dead ? (
                                <>
                                    {item.commentCount > 0 ? (
                                        <>
                                            <span> | </span>
                                            <span className="item-comments">
                                                <Link href={`/item?id=${item.id}`}>
                                                    {item.commentCount.toLocaleString()}comment{item.commentCount > 1 ? "s" : null}
                                                </Link>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span> | </span>
                                            <span className="item-comments">
                                                <Link href={`/item?id=${item.id}`}>discuss</Link>
                                            </span>
                                        </>
                                    )}
                                </>
                            ) : null}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* ITEM CONTENT */}
            {!item.url && item.text ? (
                <div className="item-text-content">
                    <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                </div>
            ) : null}

            {/* COMMENT SECTION */}
            {!item.dead ? (
                <>
                    <div className="item-comment-box">
                        <textarea value={commentInputValue} onChange={updateCommentInputValue} />
                    </div>
                    <div className="item-add-comment-btn">
                        <input type="submit" value="add comment" onClick={requestAddNewComment} />
                        &nbsp;
                        {loading && <span> loading...</span>}
                    </div>
                    {error.commentTextTooLongError ? (
                        <div className="item-add-comment-error">
                            <span>Text exceeds limit of 5,000 characters.</span>
                        </div>
                    ) : null}
                    {error.commentTextRequiredError ? (
                        <div className="item-add-comment-error">
                            <span>Text is required.</span>
                        </div>
                    ) : null}
                    {error.commentSubmitError ? (
                        <div className="item-add-comment-error">
                            <span>An error occurred.</span>
                        </div>
                    ) : null}
                </>
            ) : null}
        </div>
    );
}
