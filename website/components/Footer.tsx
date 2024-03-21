import { useState, type ChangeEventHandler, type KeyboardEventHandler } from "react";
import Link from "next/link";
import Router from "next/router";

export default function Footer() {
    const [searchInputValue, setSearchInputValue] = useState("");

    const updateSearchInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchInputValue(event.target.value);
    };

    const listenForEnterKeyPress: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === "Enter" && searchInputValue) {
            // location.href = `/search?q=${searchInputValue}`;
            Router.push(`/search?q=${searchInputValue}`);
        }
    };

    return (
        <div className="footer-wrapper">
            <div className="footer-link-list">
                <div className="footer-link-list-item">
                    <Link href="/newsguidelines">Guidelines</Link>
                </div>
                <div className="footer-link-list-item">
                    <span>|</span>
                </div>
                <div className="footer-link-list-item">
                    <Link href="/newsfaq">FAQ</Link>
                </div>
                <div className="footer-link-list-item">
                    <span>|</span>
                </div>
                <div className="footer-link-list-item">
                    <Link href="https://x.com/cryptograthor">Contact</Link>
                </div>
            </div>

            <div className="footer-search">
                <span className="footer-search-label">Search:</span>
                <input
                    className="footer-search-input"
                    type="text"
                    value={searchInputValue}
                    onChange={updateSearchInputValue}
                    onKeyDown={listenForEnterKeyPress}
                />
            </div>
            {/* optional footer  */}
            {/* <div className="footer-search"> */}
            {/* <span style={{ fontSize: "11px" }}>
                </span> */}
            {/* </div> */}
        </div>
    );
}
