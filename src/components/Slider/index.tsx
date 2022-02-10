import React, { useState } from "react";
import { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  setIsActiveParentScroll: (active: boolean) => void;
  setIsActiveChildScroll: (active: boolean) => void;
  isActiveParentScroll: boolean;
  isActiveChildScroll: boolean;
}

const Slider: React.FC<IProps> = ({
  setIsActiveParentScroll,
  setIsActiveChildScroll,
  isActiveParentScroll,
  isActiveChildScroll,
}) => {
  const [slideItems, setSlideItems] = useState(slideDatas);
  const [currentSlideId, setCurrentSlideId] = useState(0);

  const onClickItem = (id: number) => {
    // ...
  };

  const scrollRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const el = scrollRef.current;

    if (el) {
      const onWheel = (e: any) => {
        if (!isActiveChildScroll) return;

        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
        });
        console.log("slide scroll : ", el.scrollLeft);

        if (el.scrollLeft === 0) {
          setIsActiveParentScroll(true);
          setIsActiveChildScroll(false);
          setCurrentSlideId(0);
        }
        if (el.scrollLeft > 200 && el.scrollLeft < 400) {
          if (currentSlideId === 2) return;
          setCurrentSlideId(2);
        }
        if (el.scrollLeft > 400 && el.scrollLeft < 600) {
          if (currentSlideId === 3) return;
          setCurrentSlideId(3);
        }
        if (el.scrollLeft > 600 && el.scrollLeft < 800) {
          if (currentSlideId === 4) return;
          setCurrentSlideId(4);
        }
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, [
    currentSlideId,
    setIsActiveParentScroll,
    setIsActiveChildScroll,
    isActiveChildScroll,
  ]);

  useEffect(() => {
    if (!isActiveParentScroll) {
      scrollRef.current?.scrollTo({
        left: 0,
      });
    }
  }, [isActiveParentScroll]);

  return (
    <Container ref={scrollRef as any} isActiveScroll={isActiveChildScroll}>
      <ul className="slide-list">
        {slideItems.map((slide) => (
          <li
            key={slide.id}
            className={`slide-item ${
              slide.id === currentSlideId ? "focus" : ""
            }`}
          >
            <div
              className="slide-content"
              onClick={() => onClickItem(slide.id)}
            >
              {/* {slide.text} */}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const slideDatas = [
  { id: 1, text: "aaa" },
  { id: 2, text: "bbb" },
  { id: 3, text: "ccc" },
  { id: 4, text: "ddd" },
  { id: 5, text: "eee" },
  { id: 6, text: "fff" },
  { id: 7, text: "ggg" },
  { id: 8, text: "hhh" },
];

const slideFocusOn = keyframes`
  0% {
    transform: rotateY(0deg);
    width: 300px;
    height: 300px;        
  }
  50% {
    transform: rotateY(15deg);
  }
  100% {
    transform: rotateY(0deg);
    width: 350px;
    height: 350px;        
  }
`;

const slideFocusOff = keyframes`
  0% {
    transform: rotateY(0deg);
    width: 350px;
    height: 350px;            
  }
  50% {
    transform: rotateY(15deg);
  }
  100% {
    transform: rotateY(0deg);
    width: 300px;
    height: 300px;        
  }
`;

const Container = styled.div<{ isActiveScroll: boolean }>`
  height: 100vh;
  display: flex;
  align-items: center;
  margin-left: ${({ isActiveScroll }) => (isActiveScroll ? "0" : "300px")};
  /* overflow-x: hidden; */
  /* -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  } */
  overflow-x: ${({ isActiveScroll }) => (isActiveScroll ? "auto" : "visible")};
  transition: all 0.5s ease-in-out;

  .test-btn {
    position: fixed;
    top: 40px;
    right: 40px;
    z-index: 10;
    background-color: #ccc;
  }

  .slide-list {
    white-space: nowrap;
    display: flex;
    align-items: center;

    .slide-item {
      padding: 20px;
      perspective: 800px;

      &:not(:first-child) {
        .slide-content {
          width: 300px;
          height: 300px;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);

          animation-duration: 0.3s;
          animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          animation-name: ${slideFocusOff};
          animation-fill-mode: forwards;
        }
      }

      /* &:first-child {
        .slide-content {
          width: 500px;
        }
      } */

      &.focus {
        .slide-content {
          animation-duration: 0.3s;
          animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
          animation-name: ${slideFocusOn};
          animation-fill-mode: forwards;
        }
      }
    }
  }
`;

export default Slider;
