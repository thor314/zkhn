import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeadMetadata from "@/components/HeadMetadata";
import ItemComponent from "@/components/Item";
import CommentSection from "@/components/CommentSection";

import getItemById from "@/api/items/getItemById";

export default function Item({
    item,
    authUserData,
    getDataError,
    notFoundError,
    goToString,
    comments,
    page,
    isMoreComments,
}) {
    return (
        <div className="layout-wrapper">
            <HeadMetadata title={!!item.title ? `${item.title} | zkNews` : "zkNews"} />
            <Header
                userSignedIn={authUserData && authUserData.userSignedIn}
                username={authUserData && authUserData.username}
                karma={authUserData && authUserData.karma}
                goto={goToString}
            />
            <div className="item-content-container">
                {item && !notFoundError && !getDataError ? (
                    <>
                        <ItemComponent
                            item={item}
                            currUsername={authUserData.username}
                            userSignedIn={authUserData.userSignedIn}
                            goToString={goToString}
                            isModerator={authUserData.isModerator}
                        />
                        <CommentSection
                            comments={comments}
                            parentItemId={item.id}
                            isMore={isMoreComments}
                            isMoreLink={`/item?id=${item.id}&page=${page + 1}`}
                            userSignedIn={authUserData.userSignedIn}
                            currUsername={authUserData.username}
                            showDownvote={authUserData.showDownvote}
                            goToString={goToString}
                            isModerator={authUserData.isModerator}
                        />
                    </>
                ) : (
                    <div className="item-get-data-error-msg">
                        {notFoundError ? <span>No such item.</span> : <span>An error occurred.</span>}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export async function getServerSideProps({ req, query }) {
    const itemId = query.id ? query.id : "";
    const page = query.page ? parseInt(query.page) : 1;

    const apiResult = await getItemById(itemId, page, req);
    // console.log("api result", apiResult);

    return {
        props: {
            item: (apiResult && apiResult.item) || {},
            authUserData: apiResult && apiResult.authUser ? apiResult.authUser : {},
            getDataError: (apiResult && apiResult.getDataError) || false,
            notFoundError: (apiResult && apiResult.notFoundError) || false,
            goToString: page > 1 ? `item?id=${itemId}&page=${page}` : `item?id=${itemId}`,
            page: page || 1,
            comments: (apiResult && apiResult.comments) || [],
            isMoreComments: (apiResult && apiResult.isMoreComments) || false,
        },
    };
}
