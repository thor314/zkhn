import HeadMetadata from "@/components/HeadMetadata";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemsList from "@/components/ItemsList";

import getRankedItemsByPage from "@/api/items/getRankedItemsByPage";

export default function News({ items, authUserData, page, isMore, getDataError, goToString }) {
    return (
        <div className="layout-wrapper">
            <HeadMetadata title="zkNews" />
            <Header
                userSignedIn={authUserData && authUserData.userSignedIn}
                username={authUserData && authUserData.username}
                karma={authUserData && authUserData.karma}
                goto={goToString}
            />
            <div className="items-list-content-container">
                {!getDataError ? (
                    <>
                        <ItemsList
                            items={items}
                            goToString={goToString}
                            userSignedIn={authUserData.userSignedIn}
                            currUsername={authUserData.username}
                            showHideOption={true}
                            showRank={true}
                            isMoreLink={`/news?page=${page + 1}`}
                            isMore={isMore}
                            isModerator={authUserData.isModerator}
                        />
                    </>
                ) : (
                    <div className="items-list-error-msg">
                        <span>An error occurred.</span>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export async function getServerSideProps({ req, query }) {
    const page = query.page ? parseInt(query.page) : 1;

    const apiResult = await getRankedItemsByPage(page, req);
    // console.log(apiResult);

    return {
        props: {
            items: (apiResult && apiResult.items) || [],
            authUserData: apiResult && apiResult.authUser ? apiResult.authUser : {},
            page: page || 0,
            isMore: (apiResult && apiResult.isMore) || false,
            getDataError: (apiResult && apiResult.getDataError) || false,
            goToString: page > 1 ? `news?page=${page}` : "news",
        },
    };
}
