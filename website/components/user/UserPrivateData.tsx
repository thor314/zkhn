import { useState, type ChangeEventHandler } from "react";
import Link from "next/link";
import Router from "next/router";
import moment from "moment";
import { isErrorFromAlias } from "@zodios/core";

import apiClient from "@/zodios/apiClient";
import usersApi from "@/zodios/users/usersApi";

type UserPrivateDataProps = {
    username: string,
    email: string,
    about: string,
    created: string,
    karma: number,
    showDead: boolean,
};


export default function UserPrivateData({username, email, about, created, karma, showDead}: UserPrivateDataProps) {
    const [aboutInputValue, setAboutInputValue] = useState(about);
    const [emailInputValue, setEmailInputValue] = useState(email);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showDeadValue, setShowDeadValue] = useState(showDead ? "yes" : "no");

    const initialTextAreaHeight = about ? about.split(/\r\n|\r|\n/).length + 3 : 6;

    const updateAboutInputValue: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setAboutInputValue(event.target.value);
    };

    const updateEmailInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmailInputValue(event.target.value);
    };

    const updateShowDeadValue: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setShowDeadValue(event.target.value);
    };

    const submitUpdateRequest = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await apiClient.updateUser({
                email: emailInputValue,
                about: aboutInputValue,
                showDead: showDeadValue === "yes",
            });
            setLoading(false);
            Router.push(Router.asPath);
        } catch (error) {
            setLoading(false);
            if (isErrorFromAlias(usersApi, "updateUser", error)) {
                setError(error.response.data.error);
            }
        }
    }

    return (
        <div className="user-private-data">
            {!email ? (
                <div className="user-add-email-address-msg">
                    <span>
                        Please put a valid address in the email field, or we won't be able to send you a new password if
                        you forget yours. Your address is only visible to you and us. Crawlers and other users can't see
                        it.
                    </span>
                </div>
            ) : null}

            {/* USERNAME SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span>user:</span>
                </div>
                <div className="user-item-content username">
                    <span>{username}</span>
                </div>
            </div>

            {/* CREATED SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span>created:</span>
                </div>
                <div className="user-item-content created">
                    <span>{moment.unix(Date.parse(created) / 1000).format("MMM D, YYYY")}</span>
                </div>
            </div>

            {/* KARMA SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span>karma:</span>
                </div>
                <div className="user-item-content karma">
                    <span>{karma.toLocaleString()}</span>
                </div>
            </div>

            {/* ABOUT FIELD */}
            <div className="user-item">
                <div className="user-item-label about">
                    <span>about:</span>
                </div>
                <div className="user-item-content about">
                    <textarea
                        cols={60}
                        rows={initialTextAreaHeight}
                        wrap="virtual"
                        value={aboutInputValue}
                        onChange={updateAboutInputValue}
                    />
                    <span className="user-item-about-help">
                        <Link href="/formatdoc">help</Link>
                    </span>
                </div>
            </div>

            {/* EMAIL FIELD */}
            <div className="user-item">
                <div className="user-item-label">
                    <span>email:</span>
                </div>
                <div className="user-item-content email">
                    <input type="text" value={emailInputValue} onChange={updateEmailInputValue} />
                </div>
            </div>

            {/* SHOWDEAD SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span>showdead:</span>
                </div>
                <div className="user-item-content email">
                    <select value={showDeadValue} onChange={updateShowDeadValue}>
                        <option value="no">no</option>
                        <option value="yes">yes</option>
                    </select>
                </div>
            </div>

            {/* CHANGE PASSWORD SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span></span>
                </div>
                <div className="user-item-content">
                    <span>
                        <Link href="/changepw">change password</Link>
                    </span>
                </div>
            </div>

            {/* SUBMISSION SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span></span>
                </div>
                <div className="user-item-content">
                    <span>
                        <Link href={`/submitted?id=${username}`}>submissions</Link>
                    </span>
                </div>
            </div>

            {/* COMMENT SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span></span>
                </div>
                <div className="user-item-content">
                    <span>
                        <Link href={`/threads?id=${username}`}>comments</Link>
                    </span>
                </div>
            </div>

            {/* CATEGORY SECTION */}
            {/* TODO(TK 2024-02-09) */}

            {/* TAGS SECTION */}
            {/* TODO(TK 2024-02-09) */}

            {/* HIDDEN SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span></span>
                </div>
                <div className="user-item-content">
                    <span>
                        <Link href={`/hidden`}>hidden</Link>
                    </span>
                </div>
            </div>

            {/* UPVOTE COMMENT SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span></span>
                </div>
                <div className="user-item-content">
                    <span>
                        <Link href={`/upvoted?id=${username}`}>upvoted items</Link>
                    </span>
                    <span> / </span>
                    <span>
                        <Link href={`/upvoted?id=${username}&comments=t`}>comments</Link>
                    </span>
                    <span>
                        <i>(private)</i>
                    </span>
                </div>
            </div>

            {/* FAVORITE COMMENT SECTION */}
            <div className="user-item">
                <div className="user-item-label">
                    <span></span>
                </div>
                <div className="user-item-content">
                    <span>
                        <Link href={`/favorites?id=${username}`}>favorite items</Link>
                    </span>
                    <span> / </span>
                    <span>
                        <Link href={`/favorites?id=${username}&comments=t`}>comments</Link>
                    </span>
                    <span>
                        <i>(shared)</i>
                    </span>
                </div>
            </div>

            {/* SUBMIT FORM SECTION */}
            <div className="user-submit-btn">
                <input type="submit" value="update" onClick={submitUpdateRequest} />
                {loading && <span> loading...</span>}
            </div>
            {error ? (
                <div className="user-submit-error-msg">
                    <span>{error}</span>
                </div>
            ) : null}
        </div>
    );
}
