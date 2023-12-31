"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";

const ChapterCard = React.forwardRef(
  ({ chapter, chapterIndex, setcompletedChapters }, ref) => {
    //Use this for making the color changes to chapter fetch success
    const [Success, setSuccess] = React.useState("");
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

    const addChapterIdToSet = React.useCallback(() => {
      setcompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(chapter.id);
        return newSet;
      });
    }, [chapter.id, setcompletedChapters]);

    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet();
      }
    }, [chapter, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        if (chapter.videoId) {
          addChapterIdToSet();
          return;
        }
        getChapterInfo(undefined, {
          onSuccess: () => {
            setSuccess(true);
            addChapterIdToSet();
          },
          onError: (error) => {
            console.error(error);
            setSuccess(false);
            addChapterIdToSet();
          },
        });
      },
    }));

    return (
      <div
        className="card container  m-2"
        key={chapter.id}
        style={{
          backgroundColor:
            Success === true ? "#689C0D" : Success === false ? "#ff0000" : "",
        }}
      >
        <h5 className="fs-5 font-monospace">
          Chapter-{chapterIndex + 1}: {chapter.name}
        </h5>
      </div>
    );
  }
);

ChapterCard.displayName = "ChapterCard";

export default ChapterCard;
