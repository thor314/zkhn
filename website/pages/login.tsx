import { useState, type ChangeEventHandler } from "react";
import { type InferGetServerSidePropsType, type GetServerSideProps } from "next";
import Link from "next/link";
import Router from "next/router";
import { isErrorFromAlias } from "@zodios/core";

import apiClient from "@/zodios/apiClient";

import HeadMetadata from "@/components/HeadMetadata";
import AlternateHeader from "@/components/AlternateHeader";


export default function Login({ goto }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [loginState, setLoginState] = useState({
        loginUsernameInputValue: "",
        loginPasswordInputValue: "",
    });

    const [createAccountState, setCreateAccountState] = useState({
        createAccountUsernameInputValue: "",
        createAcountPasswordInputValue: "",
    });

    const [createAccountError, setCreateAccountError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    const updateLoginUsernameInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setLoginState({
            ...loginState,
            loginUsernameInputValue: event.target.value,
        });
    };

    const updateLoginPasswordInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setLoginState({
            ...loginState,
            loginPasswordInputValue: event.target.value,
        });
    };

    const updateCreateAccountUsernameInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setCreateAccountState({
            ...createAccountState,
            createAccountUsernameInputValue: event.target.value,
        });
    };

    const updateCreateAccountPasswordInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setCreateAccountState({
            ...createAccountState,
            createAcountPasswordInputValue: event.target.value,
        });
    };

    const submitLogin = async () => {
        if (loading) return;

        setLoginError("");

        if (loginState.loginUsernameInputValue.length === 0) {
            setLoginError("Username cannot be empty");
        } else if (loginState.loginPasswordInputValue.length === 0) {
            setLoginError("Password cannot be empty");
        } else {
            setLoading(true);
            try {
                const res = await apiClient.login({
                    username: loginState.loginUsernameInputValue,
                    password: loginState.loginPasswordInputValue,
                });
                setLoading(false);
                Router.push(`/${goto}`);
            } catch (error) {
                setLoading(false);
                if (isErrorFromAlias(apiClient.api, "login", error)) {
                    setLoginError(error.response.data.error);
                }
            }
        }
    };

    const submitCreateAccount = async () => {
        if (loading) return;

        setCreateAccountError("");

        // TODO: validate username and password
        setLoading(true);
        try {
            const res = await apiClient.createUser({
                username: createAccountState.createAccountUsernameInputValue,
                password: createAccountState.createAcountPasswordInputValue,
            });
            setLoading(false);
            Router.push(`/${goto}`);
        } catch (error) {
            setLoading(false);
            if (isErrorFromAlias(apiClient.api, "createUser", error)) {
                setCreateAccountError(error.response.data.error);
            }
        }
    };

    return (
        <div className="login-wrapper layout-wrapper">
            <HeadMetadata title="Login | zkNews" />
            <AlternateHeader displayMessage="Login | Signup" />

            {/*LOGIN SECTION*/}
            {/* PROD: better messages for bad login, banned user, other */}
            {loginError ? (
                <div className="login-error-msg">
                    <span>{loginError}</span>
                </div>
            ) : null}

            <div className="login-header">
                <span>Login</span>
            </div>
            <div className="login-input-item">
                <div className="login-input-item-label">
                    <span>username:</span>
                </div>
                <div className="login-input-item-input">
                    <input
                        type="text"
                        value={loginState.loginUsernameInputValue}
                        onChange={updateLoginUsernameInputValue}
                    />
                </div>
            </div>
            <div className="login-input-item">
                <div className="login-input-item-label">
                    <span>password:</span>
                </div>
                <div className="login-input-item-input">
                    <input
                        type="password"
                        value={loginState.loginPasswordInputValue}
                        onChange={updateLoginPasswordInputValue}
                    />
                </div>
            </div>
            <div className="login-submit-btn">
                <input type="submit" value="login" onClick={submitLogin} />
                &nbsp;
                {loading && <span> loading...</span>}
            </div>
            <div className="login-input-item-forgot-text">
                <span>
                    <Link href="/forgot">Forgot your Password?</Link>
                </span>
            </div>

            <div
                style={{
                    borderTop: "2px solid var(--c-accent)",
                    paddingBottom: "20px",
                }}
            />

            {/*CREATE ACCOUNT SECTION*/}
            {/* PROD: better messages for taken username, username/password length, other */}
            {createAccountError ? (
                <div className="login-error-msg">
                    <span>{createAccountError}</span>
                </div>
            ) : null}
            <div className="login-header">
                <span>Create Account</span>
            </div>
            <div className="login-input-item">
                <div className="login-input-item-label">
                    <span>username:</span>
                </div>
                <div className="login-input-item-input">
                    <input
                        type="text"
                        value={createAccountState.createAccountUsernameInputValue}
                        onChange={updateCreateAccountUsernameInputValue}
                    />
                </div>
            </div>
            <div className="login-input-item">
                <div className="login-input-item-label">
                    <span>password:</span>
                </div>
                <div className="login-input-item-input">
                    <input
                        type="password"
                        value={createAccountState.createAcountPasswordInputValue}
                        onChange={updateCreateAccountPasswordInputValue}
                    />
                </div>
            </div>
            <div className="login-submit-btn">
                <input type="submit" value="create account" onClick={submitCreateAccount} />
                &nbsp;
                {loading && <span> loading...</span>}
            </div>
        </div>
    );
}

export const getServerSideProps = (async ({ req, query }) => {
    const goto = decodeURIComponent((
        Array.isArray(query.goto)
            ? query.goto[0]
            : query.goto
    ) ?? "");

    try {
        await apiClient.authenticate({
            headers: { cookie: req.headers.cookie }
        });
        return {
            redirect: {
                // destination: "/",
                destination: `/${goto}`,
                permanent: false,
            }
        }
    } catch (error) {
        if (isErrorFromAlias(apiClient.api, "authenticate", error)) {
            if (error.response.data.code !== 401) {
                console.log(`====== ERROR login.tsx authenticate ======`)
                console.log(error)
                // PROD: most errors will just be 401 not logged in, but 403 banned 
                // and 500 internal server errors should be handled somehow?
            }
        }
    }

    return {
        props: { goto },
    };
}) satisfies GetServerSideProps;
