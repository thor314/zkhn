import { useState, type ChangeEventHandler } from "react";
import Router from "next/router";
import Link from "next/link";
import { type InferGetServerSidePropsType, type GetServerSideProps } from "next";
import { isErrorFromAlias } from "@zodios/core";

import apiClient from "@/zodios/apiClient";

import HeadMetadata from "@/components/HeadMetadata";
import AlternateHeader from "@/components/AlternateHeader";

// TODO: when email works, update to alternately use resetPasswordToken without requiring login
export default function ChangePw({
    userContainsEmail,
    username
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [currentPasswordInputValue, setCurrentPasswordInputValue] = useState("");
    const [newPasswordInputValue, setNewPasswordInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangeCurrentPassword: ChangeEventHandler<HTMLInputElement> = (event) => {
        setCurrentPasswordInputValue(event.target.value);
    };

    const handleChangeNewPassword: ChangeEventHandler<HTMLInputElement> = (event) => {
        setNewPasswordInputValue(event.target.value);
    };

    const submitRequest = async () => {
        if (loading) return;

        // TODO: validate current and new password
        setErrorMessage("");
        setLoading(true);
        try {
            const res = await apiClient.changePassword({
                username: username,
                newPassword: newPasswordInputValue,
                currentPassword: currentPasswordInputValue,
            });
            await apiClient.logout({});
            setLoading(false);
            Router.push("/login");
        } catch (error) {
            setLoading(false);
            if (isErrorFromAlias(apiClient.api, "changePassword", error)) {
                setErrorMessage(error.response.data.error);
            }
        }
    };

    return (
        <div className="layout-wrapper">
            <HeadMetadata title="Change Password | zkNews" />
            <AlternateHeader displayMessage={`Change Password for ${username}`} />
            <div className="changepw-content-container">
                {!userContainsEmail && (
                    <div className="changepw-error-msg">
                        <span>
                            First, please put a valid email address in your <Link href={`/user?id=${username}`}>profile</Link>
                            . Otherwise you could lose your account if you mistype your new password.
                        </span>
                    </div>
                )}

                {/* ERROR INFO AREA */}
                {/* PROD: better messages for invalid current password, invalid/too short new password, internal server error */}
                {errorMessage ? (
                    <div className="changepw-error-msg">
                        <span>{errorMessage}</span>
                    </div>
                ) : <></>}

                {/* CURRENT PASSWORD FIELD */}
                <div className="changepw-input-item">
                    <div className="changepw-input-item-label">
                        <span>Current Password:</span>
                    </div>
                    <div className="changepw-input-item-input">
                        <input type="password" value={currentPasswordInputValue} onChange={handleChangeCurrentPassword} />
                    </div>
                </div>

                {/* NEW PASSWORD FIELD */}
                <div className="changepw-input-item">
                    <div className="changepw-input-item-label">
                        <span>New Password:</span>
                    </div>
                    <div className="changepw-input-item-input">
                        <input type="password" value={newPasswordInputValue} onChange={handleChangeNewPassword} />
                    </div>
                </div>

                {/* SUBMIT BTN */}
                <div className="changepw-submit-btn">
                    <input type="submit" value="Change" onClick={submitRequest} />
                    {loading && <span> loading...</span>}
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps = (async ({ req }) => {
    try {
        const authResult = await apiClient.authenticate({
            headers: { cookie: req.headers.cookie }
        });
        return {
            props: {
                userContainsEmail: authResult.authUser.containsEmail,
                username: authResult.authUser.username,
            }
        }
    } catch (error) {
        if (isErrorFromAlias(apiClient.api, "authenticate", error)) {
            // PROD: Need to handle 403 banned and 500 internal server errors
            if (error.response.data.code === 401) {
                // User not logged in, redirect
                return {
                    redirect: {
                        destination: "/login?goto=changepw",
                        permanent: false,
                    }
                }
            }
        }
        return {
            props: {
                userContainsEmail: false,
                username: "",
            }
        }
    }
}) satisfies GetServerSideProps;
