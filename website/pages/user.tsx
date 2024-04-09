import { type InferGetServerSidePropsType, type GetServerSideProps } from "next";
import { isErrorFromAlias } from "@zodios/core";

import apiClient from "@/zodios/apiClient";
import usersApi from "@/zodios/users/usersApi";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeadMetadata from "@/components/HeadMetadata";
import UserPrivateData from "@/components/user/UserPrivateData";
import UserPublicData from "@/components/user/UserPublicData";


export default function User({
    userData,
    showPrivateUserData,
    authUser,
    goToString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="layout-wrapper">
            <HeadMetadata title={`Profile: ${userData.username} | zkNews`} />
            <Header
                userSignedIn={authUser.userSignedIn}
                username={authUser.username ?? ""}
                karma={authUser.karma ?? 0}
                goto={goToString}
                pageName=""
                label=""
            />
            <div className="user-content-container">
                { showPrivateUserData
                    ? <UserPrivateData
                        username={userData.username}
                        email={userData.email}
                        about={userData.about}
                        created={userData.created}
                        karma={userData.karma}
                        showDead={userData.showDead}/> 
                    : <UserPublicData
                        username={userData.username}
                        about={userData.about}
                        created={userData.created}
                        karma={userData.karma}
                        showModeratorTools={authUser.isModerator}
                        banned={userData.banned}
                    />
                }
            </div>
            <Footer />
        </div>
    );
}

export const getServerSideProps = (async ({ req, query }) => {
    if (!query.id || Array.isArray(query.id)) {
        throw new Error();
    }

    try {
        const { authUser, showPrivateUserData, ...userData } = await apiClient.getUser({
            params: { username: query.id },
            headers: { cookie: req.headers.cookie ?? "" }
        });
        return {
            props: {
                userData,
                showPrivateUserData,
                authUser,
                goToString: `user?id=${query.id}`,
            }
        }
    } catch (error) {
        if (isErrorFromAlias(usersApi, "getUser", error)) {
            if (error.response.data.code === 404 || error.response.data.code === 422) {
                console.log(`${error.response.data.code} ERROR`)
                return { notFound: true };
            }
        }
        // this covers other errors where appropriate props are not returned, redirects to error page
        throw new Error();
    }
}) satisfies GetServerSideProps;
