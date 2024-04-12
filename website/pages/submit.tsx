import { useState, type ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { type GetServerSideProps } from "next";
import Router from "next/router";
import { isErrorFromAlias } from "@zodios/core";

import apiClient from "@/zodios/apiClient";

import HeadMetadata from "@/components/HeadMetadata";
import AlternateHeader from "@/components/AlternateHeader";

// TODO: discussion category should be automatic? how is news/ask/show done?
// categories of post submission; text = discussion, else links
// export const categories = ["discussion", "blog", "tweet", "paper", "tool", "book", "announcement", "other"];

export default function Submit({}) {
    const [loading, setLoading] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState("");
    const [urlInputValue, setUrlInputValue] = useState("");
    const [categoryInputValue, setCategoryInputValue] = useState("blog");
    const [textInputValue, setTextInputValue] = useState("");

    const [error, setError] = useState("");

    const updateTitleInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setTitleInputValue(event.target.value);
    };

    const updateUrlInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setUrlInputValue(event.target.value);
    };

    const updateCategoryInputValue: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setCategoryInputValue(event.target.value);
    };

    const updateTextInputValue: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setTextInputValue(event.target.value);
    };

    const submitRequest = async () => {
        if (loading) return;
        setError("");

        // TODO: replace with actual form validation lib
        if (titleInputValue.trim().length === 0) {
            setError("Title is required.");
        } else if (urlInputValue.trim().length && textInputValue.trim().length) {
            setError("Submissions can’t have both urls and text, so you need to pick one. If you keep the url, you can always post your text as a comment in the thread.");
        } else if (!urlInputValue.trim().length && !textInputValue.trim().length) {
            setError("Either url or text is required.");
        } else {
            setLoading(true);
            try {
                await apiClient.createItem({
                    title: titleInputValue,
                    itemCategory: categoryInputValue,
                    textOrUrlContent: textInputValue.trim().length
                        ? { text: textInputValue }
                        : { url: urlInputValue },
                });
                setLoading(false);
                Router.push("/newest");
            } catch (error) {
                setLoading(false);
                if (isErrorFromAlias(apiClient.api, "createItem", error)) {
                    setError(error.response.data.error);
                }
            }
        }
    };

    return (
        <div className="layout-wrapper">
            <HeadMetadata title="Submit | zkNews" />
            <AlternateHeader displayMessage="Submit" />
            <div className="submit-content-container">
                {error ? (
                    <div className="submit-content-error-msg">
                        <span>{error}</span>
                    </div>
                ) : null}

                {/* TITLE FIELD */}
                <div className="submit-content-input-item title">
                    <div className="submit-content-input-item-label">
                        <span>title</span>
                    </div>
                    <div className="submit-content-input-item-input">
                        <input type="text" value={titleInputValue} onChange={updateTitleInputValue}/>
                    </div>
                </div>

                {/* URL FIELD */}
                <div className="submit-content-input-item url">
                    <div className="submit-content-input-item-label">
                        <span>url</span>
                    </div>
                    <div className="submit-content-input-item-input">
                        <input type="text" value={urlInputValue} onChange={updateUrlInputValue} />
                    </div>
                </div>

                {/* CATEGORY FIELD */}
                <div className="submit-content-input-item category">
                    <div className="submit-content-input-item-label">
                        <span>category</span>
                    </div>
                    <div className="submit-content-input-item-input">
                        <select value={categoryInputValue} onChange={updateCategoryInputValue}>
                            <option value="blog">blog</option>
                            <option value="tweet">tweet</option>
                            <option value="paper">paper</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                </div>

                <div className="submit-content-input-or-divider">
                    <span>or</span>
                </div>

                {/* TEXT FIELD */}
                <div className="submit-content-text-input-item">
                    <div className="submit-content-text-input-item-label">
                        <span>text</span>
                    </div>
                    <div className="submit-content-text-input-item-input">
                        <textarea value={textInputValue} onChange={updateTextInputValue} />
                    </div>
                </div>

                {/* SUBMIT BTN */}
                <div className="submit-content-input-btn">
                    <input type="submit" value="submit" onClick={submitRequest} />
                    {loading && <span> loading...</span>}
                </div>
                <div className="submit-content-bottom-instructions">
                    <span>
                        Leave url blank to submit a question for discussion. If there is no url, the text (if any) will
                        appear at the top of the thread.
                    </span>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = (async ({ req }) => {
    try {
        await apiClient.authenticate({
            headers: { cookie: req.headers.cookie }
        });
        return { props: {} };
    } catch (error) {
        if (isErrorFromAlias(apiClient.api, "authenticate", error)) {
            if (error.response.data.code === 401 || error.response.data.code === 403) {
                // User not signed in or user is banned
                return {
                    redirect: {
                        destination: "/login?goto=submit",
                        permanent: false,
                    }
                }
            }
        }
        // Covers 500 ISE and non-alias errors
        throw new Error();
    }
}) satisfies GetServerSideProps;
