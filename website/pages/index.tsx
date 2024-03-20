import HeadMetadata from "../components/HeadMetadata";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ItemsList from "../components/ItemsList";

import getRankedItemsByPage from "../api/items/getRankedItemsByPage";

export default function Index({ items, authUserData, page, isMore, getDataError, goToString }) {
    return (
        <div className="layout-wrapper">
            <HeadMetadata title="zkNews" description="News and Bullshit people having." />
            <Header
                userSignedIn={authUserData.userSignedIn}
                username={authUserData.username}
                karma={authUserData.karma}
                goto={goToString}
            />
            <div className="items-list-content-container">
                {!getDataError ? (
                    <ItemsList
                        items={items}
                        goToString={goToString}
                        userSignedIn={authUserData.userSignedIn}
                        currUsername={authUserData.username}
                        showHideOption={true}
                        showRank={true}
                        isMoreLink={"/news?page=2"}
                        isMore={isMore}
                        isModerator={authUserData.isModerator}
                    />
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
    const page = 1;

    const apiResult = await getRankedItemsByPage(page, req);

    return {
        props: {
            items: (apiResult && apiResult.items) || [],
            authUserData: apiResult && apiResult.authUser ? apiResult.authUser : {},
            page: page,
            isMore: (apiResult && apiResult.isMore) || false,
            getDataError: (apiResult && apiResult.getDataError) || false,
            goToString: "",
        },
    };
}
