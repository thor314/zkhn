import HeadMetadata from "@/components/HeadMetadata";
import SearchPageHeader from "@/components/search/SearchPageHeader";
import SearchPageFooter from "@/components/search/SearchPageFooter";
import SearchItem from "@/components/search/SearchItem";
import SearchComment from "@/components/search/SearchComment";
import Filters from "@/components/search/Filters";
import PageNumbers from "@/components/search/PageNumbers";

import getAlgoliaData from "@/api/search/getAlgoliaData";

export default function Search({
    searchQuery,
    hits,
    getDataError,
    totalNumOfHits,
    processingTimeMS,
    itemType,
    sortBy,
    dateRange,
    startDate,
    endDate,
    currPageNumber,
    totalNumOfPages,
}) {
    return (
        <div className="search-wrapper">
            <HeadMetadata title="Search | zkNews" />
            <SearchPageHeader
                searchQuery={searchQuery}
                showSearchBar
                showSettingsButton
                currPageNumber={currPageNumber}
                itemType={itemType}
                dateRange={dateRange}
                startDate={startDate}
                endDate={endDate}
                sortBy={sortBy}
            />
            <div className="search-results">
                <Filters
                    searchQuery={searchQuery}
                    currPageNumber={currPageNumber}
                    dateRange={dateRange}
                    startDate={startDate}
                    endDate={endDate}
                    sortBy={sortBy}
                    itemType={itemType}
                    totalNumOfHits={totalNumOfHits}
                    processingTimeMS={processingTimeMS}
                />
                <div className="search-results-items">
                    {hits.length > 0 && !getDataError
                        ? hits.map((hit, index) => {
                              return (
                                  <div
                                      key={index}
                                      style={{
                                          padding: "8px 0px",
                                          borderBottom: "1px solid rgba(var(--c-white), 0.1)",
                                      }}>
                                      {hit.type === "item" ? (
                                          <SearchItem item={hit} key={hit.objectID} searchQuery={searchQuery} />
                                      ) : (
                                          <SearchComment comment={hit} key={hit.objectID} searchQuery={searchQuery} />
                                      )}
                                  </div>
                              );
                          })
                        : null}
                    {getDataError ? (
                        <div className="search-error-msg">
                            <span>An error occurred.</span>
                        </div>
                    ) : null}
                    {hits.length === 0 && !getDataError ? (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "var(--c-text-light)",
                                opacity: 0.5,
                                height: "30vh",
                            }}>
                            <b>
                                No Results <i>:(</i>
                            </b>
                        </div>
                    ) : null}
                </div>
                {!getDataError ? (
                    <PageNumbers
                        totalNumOfPages={totalNumOfPages}
                        currPageNumber={currPageNumber}
                        searchQuery={searchQuery}
                        itemType={itemType}
                        dateRange={dateRange}
                        startDate={startDate}
                        endDate={endDate}
                        sortBy={sortBy}
                    />
                ) : null}
            </div>
            <SearchPageFooter />
        </div>
    );
}

export async function getServerSideProps({ query }) {
    const apiResult = await getAlgoliaData(query);

    return {
        props: {
            searchQuery: query.q ? query.q : "",
            hits: apiResult.hits ? apiResult.hits : [],
            getDataError: apiResult.error || false,
            totalNumOfHits: apiResult.nbHits,
            processingTimeMS: apiResult.processingTimeMS || 0,
            itemType: apiResult.itemType ? apiResult.itemType : "",
            sortBy: apiResult.sortBy ? apiResult.sortBy : "",
            dateRange: apiResult.dateRange ? apiResult.dateRange : "",
            startDate: query.startDate ? query.startDate : "",
            endDate: query.endDate ? query.endDate : "",
            currPageNumber: apiResult.page || 0,
            totalNumOfPages: apiResult.nbPages || 1,
        },
    };
}
