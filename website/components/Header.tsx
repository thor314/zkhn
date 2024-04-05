import Link from "next/link";
import Router from "next/router";

import apiClient from "@/zodios/apiClient";

type HeaderProps = {
    userSignedIn: boolean,
    username: string,
    karma: number,
    goto: string,
    pageName: "ask" | "show" | "submit" | "newest" | "newcomments" | "threads",
    label: string,
}

export default function Header({ userSignedIn, username, karma, goto, pageName, label }: HeaderProps) {
    const requestLogout = () => {
        apiClient.logout({})
            .then(_ => {
                Router.push(Router.asPath);
            })
            .catch(error => {
                console.error(`Header.tsx requestLogout error:`)
                console.error(error)
            });
    };

    return (
        <table className="header-wrapper">
            <tbody>
                <tr>
                    <td className="header-logo">
                        <Link href="/">

                            <img src="/android-chrome-512x512.png" />

                        </Link>
                    </td>
                    <td className="header-links">
                        <span className="header-links-items">
                            <b className="header-links-name">
                                <Link href="/news">zkNews</Link>
                            </b>
                            <Link href="/newest">new</Link>
                            <span> | </span>
                            {userSignedIn ? (
                                <>
                                    <Link
                                        className={pageName === "threads" ? "white-text" : ""}
                                        href={`/threads?id=${username}`}>
                                        threads
                                    </Link>
                                    <span> | </span>
                                </>
                            ) : null}
                            <Link href="/past">past</Link>
                            {/* <span> | </span>
                            <Link className={pageName === "newcomments" ? "white-text" : null} href="/newcomments">
                                comments
                            </Link> */}
                            <span> | </span>
                            <Link className={pageName === "ask" ? "white-text" : ""} href="/ask">
                                ask
                            </Link>
                            <span> | </span>
                            <Link className={pageName === "show" ? "white-text" : ""} href="/show">
                                show
                            </Link>
                            <span> | </span>
                            <Link className={pageName === "submit" ? "white-text" : ""} href="/submit">
                                submit
                            </Link>
                            {label ? (
                                <>
                                    <span> | </span>
                                    <span className="white-text">{label}</span>
                                </>
                            ) : null}
                        </span>
                    </td>
                    <td className="header-right-nav-links">
                        <span className="header-right-nav-links-items">
                            {userSignedIn ? (
                                <>
                                    <Link href={`/user?id=${username}`} legacyBehavior>{username}</Link>
                                    <span> ({karma.toLocaleString()})</span>
                                    <span> | </span>
                                    <span className="header-logout" onClick={requestLogout}>
                                        logout
                                    </span>
                                </>
                            ) : (
                                <>
                                    <Link href={`/login${goto ? "?goto=" + encodeURIComponent(goto) : ""}`}>login</Link>
                                </>
                            )}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
