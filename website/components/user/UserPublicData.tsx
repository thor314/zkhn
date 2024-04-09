import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import moment from "moment";

type UserPublicDataProps = {
    username: string;
    about: string;
    created: string;
    karma: number;
    showModeratorTools: boolean;
    banned: boolean;
};

export default function UserPublicData({
    username,
    about,
    created,
    karma,
    showModeratorTools,
    banned,
}: UserPublicDataProps) {
    const [loading, setLoading] = useState(false);

    // TODO: update ban/unban functions when moderator backend happens
    const requestAddUserBan = () => {
        if (loading) return;
        setLoading(true);
        // addUserBan(username, (_response) => {
        setLoading(false);
        Router.push(Router.asPath);
        // });
    };

    const requestRemoveUserBan = () => {
        if (loading) return;
        setLoading(true);
        // removeUserBan(username, (_response) => {
        setLoading(false);
        Router.push(Router.asPath);
        // });
    };

    return (
        <div className="user-public-data">
            {/* USERNAME SECTION */}
            <div className="user-item">
                <div className="user-item-label public">
                    <span>user:</span>
                </div>
                <div className="user-item-content username">
                    <span>{username}</span>
                </div>
            </div>

            {/* CREATED SECTION */}
            <div className="user-item">
                <div className="user-item-label public">
                    <span>created:</span>
                </div>
                <div className="user-item-content created">
                    <span>{moment.unix(Date.parse(created) / 1000).format("MMM D, YYYY")}</span>
                </div>
            </div>

            {/* KARMA SECTION */}
            <div className="user-item">
                <div className="user-item-label public">
                    <span>karma:</span>
                </div>
                <div className="user-item-content karma">
                    <span>{karma.toLocaleString()}</span>
                </div>
            </div>

            {/* ABOUT SECTION */}
            <div className="user-item">
                <div className="user-item-label about public">
                    <span>about:</span>
                </div>
                <div className="user-item-content about public">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: about,
                        }}></span>
                </div>
            </div>

            {/* SUBMISSION SECTION */}
            <div className="user-item">
                <div className="user-item-label public">
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
                <div className="user-item-label public">
                    <span></span>
                </div>
                <div className="user-item-content">
                    <span>
                        <Link href={`/threads?id=${username}`}>comments</Link>
                    </span>
                </div>
            </div>

            {/* FAVORITE SECTION */}
            <div className="user-item">
                <div className="user-item-label public">
                    <span></span>
                </div>
                <div className="user-item-content">
                    <span>
                        <Link href={`/favorites?id=${username}`}>favorites</Link>
                    </span>
                </div>
            </div>

            {showModeratorTools ? (
                <div className="user-moderator-section">
                    {banned ? (
                        <div className="user-item">
                            <div className="user-item-content">
                                <span>Banned (</span>
                                <span className="user-item-ban-btn" onClick={requestRemoveUserBan}>
                                    Remove
                                </span>
                                <span>)</span>
                            </div>
                        </div>
                    ) : (
                        <div className="user-item moderator-section">
                            <div className="user-item-content">
                                <span className="user-item-ban-btn" onClick={requestAddUserBan}>
                                    Ban
                                </span>
                                <span> (User login and authentication will be revoked)</span>
                            </div>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}
