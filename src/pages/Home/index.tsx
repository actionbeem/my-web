import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slider from "../../components/Slider";

const Home: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>();
  const [isActiveParentScroll, setIsActiveParentScroll] = useState(true);
  const [isActiveChildScroll, setIsActiveChildScroll] = useState(false);

  useEffect(() => {
    const scrollWrapEl = homeRef.current;

    if (scrollWrapEl) {
      const wheelScroll = (e: any) => {
        if (isActiveParentScroll) {
          console.log("delta : ", e.deltaY);
          if (e.deltaY > 0) {
            setIsActiveParentScroll(false);
            setTimeout(() => {
              setIsActiveChildScroll(true);
            }, 500);
          }
          // scrollWrapEl.scrollTo({
          //   left: scrollWrapEl.scrollLeft + e.deltaY,
          //   // behavior: "smooth",
          // });
          // console.log("home scroll : ", scrollWrapEl.scrollLeft);
          // if (scrollWrapEl.scrollLeft > 200) {
          //   setIsActiveParentScroll(false);
          //   setTimeout(() => {
          //     setIsActiveChildScroll(true);
          //   }, 500);
          // }
        }
      };

      scrollWrapEl.addEventListener("wheel", wheelScroll);

      return () => {
        console.log("out");
        scrollWrapEl.removeEventListener("wheel", wheelScroll);
      };
    }
  }, [isActiveParentScroll]);

  return (
    <Container ref={homeRef as any}>
      <Slider
        setIsActiveParentScroll={setIsActiveParentScroll}
        setIsActiveChildScroll={setIsActiveChildScroll}
        isActiveParentScroll={isActiveParentScroll}
        isActiveChildScroll={isActiveChildScroll}
      />
    </Container>
  );
};

const Container = styled.div`
  overflow-y: hidden;
  overflow-x: auto;
  height: 100vh;
`;

export default Home;
