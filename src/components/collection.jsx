import { useCallback, useEffect, useState } from "react";
import Card from "./card";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../store/actions/unSplaceHomeAction";
import { useParams } from "react-router-dom";

const Collection = () => {
  const dispatch = useDispatch();
  const { title } = useParams();
  const [page, setPage] = useState(1);
  const { homePageData, isLoading, error } = useSelector(
    (state) => state.unSplaceHome
  );

  console.log(title, "params");

  const fetchApi = useCallback(() => {
    dispatch(getImages({ page: page }))
      .unwrap()
      .then((res) => {
        // setData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  const loadImages = useCallback(async (nextPage) => {
    try {
      const response = await dispatch(dispatch(getImages({ page: nextPage })));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

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

  useEffect(() => {
    loadImages(page);
  }, [page]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="grid items-center">
      <div className="mx-auto sm:columns-2 md:columns-3 max-w-7xl">
        {homePageData?.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Collection;
