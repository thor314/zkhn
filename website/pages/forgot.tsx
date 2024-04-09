import { useState, type ChangeEventHandler } from "react";
import { isErrorFromAlias } from "@zodios/core";

import apiClient from "@/zodios/apiClient";

import HeadMetadata from "@/components/HeadMetadata";
import AlternateHeader from "@/components/AlternateHeader";

export default function Forgot() {
    const [usernameInputValue, setUsernameInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const updateUsernameInputValue: ChangeEventHandler<HTMLInputElement> = (event) => {
        setUsernameInputValue(event.target.value);
    };

    const submitRequest = async () => {
        if (loading) return;
        if (!usernameInputValue) {
            setError("Username required");
            return;
        }

        setLoading(true);
        try {
            await apiClient.requestPasswordReset({}, { params: { username: usernameInputValue } });
            setSuccess(true);
        } catch (error) {
            if (isErrorFromAlias(apiClient.api, "requestPasswordReset", error)) {
                setError(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-wrapper layout-wrapper">
            <HeadMetadata title="Forgot Password | zkNews" />
            <AlternateHeader displayMessage="Reset Password" />
            {success ? (
                <div className="forgot-success-msg">
                    <span>
                        Password recovery message sent. If you do not see it, you may want to check your spam folder.
                    </span>
                </div>
            ) : (
                <>
                    {error ? (
                        <div className="forgot-error-msg">
                            <span>{error}</span>
                        </div>
                    ): null}
                    <div className="forgot-header">
                        <span>Reset your password</span>
                    </div>
                    <div className="forgot-input-item">
                        <div className="forgot-input-item-label">
                            <span>username:</span>
                        </div>
                        <div className="forgot-input-item-input">
                            <input type="text" value={usernameInputValue} onChange={updateUsernameInputValue} />
                        </div>
                        <div className="forgot-submit-btn">
                            <input type="submit" value="Send reset email" onClick={submitRequest} />
                            {loading && <span> loading...</span>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
