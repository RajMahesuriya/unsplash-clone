import React, { useCallback, useEffect, useState } from "react";
// import posts from "../data/post";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { allFilteredImages } from "../store/actions/unSplaceHomeAction";

const CollectionDetails = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);
  const { searchedImages, homePageData, isLoading, error } = useSelector(
    (state) => state.unSplaceHome
  );

  return (
    <section className="grid items-center">
      <div className="mx-auto sm:columns-2 md:columns-3 max-w-7xl">
        {searchedImages?.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default CollectionDetails;
