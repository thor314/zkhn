import { useState } from "react";
import Link from "next/link";
import Router from "next/router";

import Header from "../components/header.js";
import Footer from "../components/footer.js";
import HeadMetadata from "../components/headMetadata.js";

import getEditItemPageData from "../api/items/getEditItemPageData.js";
import editItem from "../api/items/editItem.js";

import renderCreatedTime from "../utils/renderCreatedTime.js";

export default function EditItem({ item, authUserData, notAllowedError, getDataError, notFoundError, goToString }) {
    const [titleInputValue, setTitleInputValue] = useState(item.title || "");
    const [textInputValue, setTextInputValue] = useState(item.text || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        titleRequiredError: false,
        titleTooLongError: false,
        textTooLongError: false,
        submitError: false,
    });

    const updateTitleInputValue = (event) => {
        setTitleInputValue(event.target.value);
    };

    const updateTextInputValue = (event) => {
        setTextInputValue(event.target.value);
    };

    const setInitialTextareaHeight = () => {
        if (item.text) {
            const numOfLines = item.text.split(/\r\n|\r|\n/).length;

            return numOfLines + 4;
        } else {
            return 6;
        }
    };

    const submitEditItem = () => {
        if (loading) return;

        if (!titleInputValue.trim()) {
            setError({
                ...error,
                titleRequiredError: true,
                titleTooLongError: false,
                textTooLongError: false,
                submitError: false,
            });
        } else if (titleInputValue.length > 80) {
            setError({
                ...error,
                titleRequiredError: false,
                titleTooLongError: true,
                textTooLongError: false,
                submitError: false,
            });
        } else if (textInputValue.length > 5000) {
            setError({
                ...error,
                titleRequiredError: false,
                titleTooLongError: false,
                textTooLongError: true,
                submitError: false,
            });
        } else {
            setLoading(true);

            editItem(item.id, titleInputValue, textInputValue, (response) => {
                setLoading(false);

                if (response.authError) {
                    // location.href = `/login?goto=${goToString}`;
                    Router.push(`/login?goto=${goToString}`);
                } else if (response.notAllowedError) {
                    setError({ ...error, notAllowedError: true });
                } else if (response.titleTooLongError) {
                    setError({
                        ...error,
                        titleRequiredError: false,
                        titleTooLongError: true,
                        textTooLongError: false,
                        submitError: false,
                    });
                } else if (response.textTooLongError) {
                    setError({
                        ...error,
                        titleRequiredError: false,
                        titleTooLongError: false,
                        textTooLongError: true,
                        submitError: false,
                    });
                } else if (response.submitError || !response.success) {
                    setError({
                        ...error,
                        titleRequiredError: false,
                        titleTooLongError: false,
                        textTooLongError: false,
                        submitError: true,
                    });
                } else {
                    // location.href = `/item?id=${item.id}`;
                    Router.push(`/item?id=${item.id}`);
                }
            });
        }
    };

    return (
        <div className="layout-wrapper">
            <HeadMetadata title="Edit Item | zkNews" />
            <Header
                userSignedIn={authUserData && authUserData.userSignedIn}
                username={authUserData && authUserData.username}
                karma={authUserData && authUserData.karma}
                goto={goToString}
                label="edit item"
            />
            <div className="edit-item-content-container">
                {!getDataError && !notAllowedError && !notFoundError ? (
                    <>
                        {/* ITEM CONTENT */}
                        <div className="edit-item-top-section grid-container">
                            <div className="edit-item-star grid-item">
                                <span>*</span>
                            </div>
                            <div className="edit-item-title-and-domain grid-item">
                                <span className="edit-item-title">
                                    <Link href={item.url ? item.url : `/item?id=${item.id}`}>{item.title}</Link>
                                </span>
                                {item.url && (
                                    <span className="edit-item-domain">
                                        (<Link href={`/from?site=${item.domain}`}>{item.domain}</Link>)
                                    </span>
                                )}
                            </div>
                            <div className="edit-item-details-bottom grid-item">
                                <span className="edit-item-score">{item.points.toLocaleString()} points</span>
                                &nbsp; by <Link href={`/user?id=${item.by}`}>{item.by}</Link>&nbsp;
                                <span className="edit-item-time">
                                    <Link href={`/item?id=${item.id}`}>{renderCreatedTime(item.created)}</Link>
                                </span>
                                <span> | </span>
                                <span>
                                    <Link href={`/delete-item?id=${item.id}`}>delete</Link>
                                </span>
                            </div>
                        </div>
                        {!item.url && item.text && (
                            <div className="edit-item-text-content">
                                <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                            </div>
                        )}
                        {/* EDIT FORM */}
                        <div className="edit-item-form-section grid-container">
                            <div className="edit-item-title-input-label grid-item">title:</div>
                            <div className="edit-item-title-input grid-item">
                                <input type="text" value={titleInputValue} onChange={updateTitleInputValue} />
                            </div>
                            {item.url && (
                                <>
                                    <div className="edit-item-url-label grid-item">url:</div>
                                    <div className="edit-item-url-value grid-item">{item.url}</div>
                                </>
                            )}
                            {!item.url && (
                                <>
                                    <div className="edit-item-text-input-label grid-item">text:</div>
                                    <div className="edit-item-text-input grid-item">
                                        <textarea
                                            type="text"
                                            cols="60"
                                            rows={setInitialTextareaHeight()}
                                            value={textInputValue}
                                            onChange={updateTextInputValue}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="edit-item-submit-btn">
                            <input type="submit" value="update" onClick={() => submitEditItem()} />
                            &nbsp;
                            {loading && <span> loading...</span>}
                        </div>
                        {/* Error Messages */}
                        {error.submitError && (
                            <div className="edit-item-submit-error-msg grid-item">
                                <span>An error occurred.</span>
                            </div>
                        )}
                        {error.titleRequiredError && (
                            <div className="edit-item-submit-error-msg grid-item">
                                <span>Title is required.</span>
                            </div>
                        )}
                        {error.titleTooLongError && (
                            <div className="edit-item-submit-error-msg grid-item">
                                <span>Title exceeds limit of 80 characters.</span>
                            </div>
                        )}
                        {error.textTooLongError && (
                            <div className="edit-item-submit-error-msg grid-item">
                                <span>Text exceeds limit of 5,000 characters.</span>
                            </div>
                        )}
                        {error.notAllowedError && (
                            <div className="edit-item-submit-error-msg grid-item">
                                <span>You can’t edit that item.</span>
                            </div>
                        )}

                        {/* Repeat this structure for each error message */}
                        {error.submitError && (
                            <div className="edit-item-submit-error-msg">
                                <span>An error occurred.</span>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="edit-item-error-msg">
                        {error.getDataError ? <span>An error occurred.</span> : null}
                        {notAllowedError ? <span>You can’t edit that item.</span> : null}
                        {error.notFoundError ? <span>Item not found.</span> : null}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export async function getServerSideProps({ query, req }) {
    const apiResult = await getEditItemPageData(query.id, req);
    // console.log("result", apiResult);

    return {
        props: {
            item: (apiResult && apiResult.item) || {},
            authUserData: apiResult && apiResult.authUser ? apiResult.authUser : {},
            notAllowedError: (apiResult && apiResult.notAllowedError) || false,
            getDataError: (apiResult && apiResult.getDataError) || false,
            notFoundError: (apiResult && apiResult.notFoundError) || false,
            goToString: `edit-item?id=${query.id}`,
        },
    };
}
