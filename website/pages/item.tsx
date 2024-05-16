import { type InferGetServerSidePropsType, type GetServerSideProps } from "next";
import { isErrorFromAlias } from "@zodios/core";

import apiClient from "@/zodios/apiClient";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeadMetadata from "@/components/HeadMetadata";
import ItemComponent from "@/components/Item";
import CommentSection from "@/components/CommentSection";

export default function Item({
    item,
    authUser,
    goToString,
    comments,
    page,
    isMoreComments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className="layout-wrapper">
            <HeadMetadata title={!!item.title ? `${item.title} | zkNews` : "zkNews"} />
            <Header
                userSignedIn={authUser.userSignedIn}
                username={authUser.username ?? ""}
                karma={authUser.karma ?? 0}
                goto={goToString}
                pageName=""
                label=""
            />
            <div className="item-content-container">
                <ItemComponent
                    item={item}
                    currUsername={authUser.username}
                    userSignedIn={authUser.userSignedIn}
                    goToString={goToString}
                    isModerator={authUser.isModerator}
                />
                <CommentSection
                    comments={comments}
                    parentItemId={item.id}
                    isMore={isMoreComments}
                    isMoreLink={`/item?id=${item.id}&page=${page + 1}`}
                    userSignedIn={authUser.userSignedIn}
                    currUsername={authUser.username}
                    showDownvote={authUser.showDownvote}
                    goToString={goToString}
                    isModerator={authUser.isModerator}
                />
            </div>
            <Footer />
        </div>
    );
}

export const getServerSideProps = (async ({ req, query }) => {
    if (!query.id || Array.isArray(query.id) || Array.isArray(query.page)) {
        throw new Error();
    }

    const itemId = query.id;
    const page = query.page ? parseInt(query.page) : 1;

    try {
        const res = await apiClient.getItem({
            headers: { cookie: req.headers.cookie ?? "" },
            params: { itemId },
            queries: { page },
        });

        const { authUser, withComments, item } = res;
        const { authenticatedItemData, comments, isMoreComments } = withComments;
        return {
            props: {
                authUser,
                comments,
                item: { ...item, ...authenticatedItemData },
                isMoreComments,
                page,
                goToString: page > 1 ? `item?id=${itemId}&page=${page}` : `item?id=${itemId}`,
            }
        }
    } catch (error) {
        if (isErrorFromAlias(apiClient.api, "getItem", error)) {
            if (error.response.data.code === 404) {
                // Invalid id -- redirect to 404 page
                // TODO: 400 response is throwing axios error, not being caught by isErrorFromAlias, fix
                return { notFound: true };
            }
        }
        console.error(error)
        // Handles 500 ISE and 422 invalid page query
        throw new Error();
    }
}) satisfies GetServerSideProps;
