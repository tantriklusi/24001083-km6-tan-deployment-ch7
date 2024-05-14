import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPost } from "./redux/actions/postActions";

export default function Posts() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.posts);
  console.log("posts", data);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div>
      <div>Posts</div>
      {data?.posts?.map((e) => (
        <div
          key={e?.id}
          onClick={async () => {
            const dataBaru = await dispatch(getPost({ id: e?.id }));
            if (data === "Error bro") {
              alert("ada eror bro");
              return;
            }
            if (dataBaru.id === 5) {
              alert("ini ID ke 5");
            } else {
              alert("ini bukan ID ke 5");
            }
          }}
        >
          {e?.title}
        </div>
      ))}
    </div>
  );
}
