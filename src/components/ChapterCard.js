"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const ChapterCard = React.forwardRef(({ chapter, chapterIndex }, ref) => {
  //Use this for making the color changes to chapter fetch success
  const [Success, setSuccess] = React.useState(false);
  const { mutate: getChapterInfo, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/chapter/getInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chapterId: chapter.id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    },
  });
  React.useImperativeHandle(ref, () => ({
    async triggerLoad() {
      getChapterInfo(undefined, {
        onSuccess: () => {
          console.log("success");
        },
      });
    },
  }));
  return (
    <div key={chapter.id}>
      <h5>
        Chapter {chapterIndex + 1} {chapter.name}
      </h5>
    </div>
  );
});

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
