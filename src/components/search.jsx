import { SearchIcon } from "@heroicons/react/outline";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  allFilteredImages,
  getImages,
  searchImages,
} from "../store/actions/unSplaceHomeAction";
import { useNavigate } from "react-router-dom";

const Search = ({ variant }) => {
  const [focused, setFocused] = useState(false);
  const [style, setStyle] = useState("");
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (variant === "navbar") {
      setStyle("rounded-full py-2 bg-neutral-200");
      if (focused) {
        setStyle((value) => `${value} bg-neutral-50 ring-1 ring-neutral-400`);
      } else {
        setStyle("rounded-full py-2 bg-neutral-200");
      }
    } else if (variant === "hero") {
      setStyle("rounded-md py-4 bg-neutral-200");
    }
  }, [focused]);

  const loadImages = useCallback(async (searchQuery, nextPage, per_page) => {
    setLoading(true);
    try {
      const response = await dispatch(
        allFilteredImages({
          search: searchQuery ? searchQuery : "health",
          page: nextPage,
          per_page: per_page,
        })
      );

      const newImages = response.payload?.results;
      setImages((prevImages) => [...prevImages, ...newImages]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadImages(search, page, 12);
  }, [search, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      const context = this;

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const searchImagesData = async (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);

    try {
      if (searchQuery === "") {
      } else {
        const debouncedAPICall = debounce(async () => {
          const response = await dispatch(
            allFilteredImages({
              search: searchQuery,
              page: page,
              per_page: pageSize,
            })
          );

          const searchData = response.payload;
          console.log(searchData);

          if (searchData?.results?.length > 0) {
            navigate(`/s/photos/${searchQuery}`);
          } else {
            navigate("/");
          }
        }, 500);

        debouncedAPICall();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={` flex flex-1 items-center gap-2 px-4 ${style}`}
    >
      <SearchIcon className="w-5 h-5 text-neutral-600 hover:text-neutral-800 cursor-pointer" />
      <input
        type="text"
        placeholder="Search free high-resolution photos"
        className="w-full bg-transparent focus:outline-none"
        onChange={(e) => searchImagesData(e)}
      />
      <VisualIcon />
    </div>
  );
};

export default Search;

const VisualIcon = () => {
  return (
    <svg
      className="w-5 h-5 opacity-50 hover:opacity-100 cursor-pointer"
      viewBox="0 0 32 32"
      version="1.1"
      aria-hidden="false"
    >
      <path d="M6.7 25.3H12V28H6.7C5.2 28 4 26.8 4 25.3V20h2.7v5.3zm0-18.6H12V4H6.7C5.2 4 4 5.2 4 6.7V12h2.7V6.7zM25.3 4H20v2.7h5.3V12H28V6.7C28 5.2 26.8 4 25.3 4zm0 21.3H20V28h5.3c1.5 0 2.7-1.2 2.7-2.7V20h-2.7v5.3zm-4-9.3c0 2.9-2.4 5.3-5.3 5.3s-5.3-2.4-5.3-5.3 2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3zm-2.6 0c0-1.5-1.2-2.7-2.7-2.7s-2.7 1.2-2.7 2.7 1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7z"></path>
    </svg>
  );
};
