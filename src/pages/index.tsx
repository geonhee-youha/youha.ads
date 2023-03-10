import { Box, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Container from "../components/atoms/Container";
import { theme } from "../themes/theme";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { grey } from "@mui/material/colors";
import Button from "../components/atoms/Button";
import { BeltBanner } from "../components/organisms/BeltBanner";
import MainNav from "../components/organisms/MainNav";
import _ from "lodash";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Index() {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      let sectionHeights = [0, 0, 0, 0];
      const scrollY = window.scrollY;
      const Intro: HTMLDivElement | null = document.querySelector(`.Intro`);
      const GlobalHeader: HTMLDivElement | null =
        document.querySelector(`.GlobalHeader`);
      const GlobalHeaderBorderLeft: HTMLDivElement | null =
        document.querySelector(`.GlobalHeader .BorderLeft`);
      const GlobalHeaderBorderCenter: HTMLDivElement | null =
        document.querySelector(`.GlobalHeader .BorderCenter`);
      const GlobalHeaderBorderRight: HTMLDivElement | null =
        document.querySelector(`.GlobalHeader .BorderRight`);
      const Background: HTMLDivElement | null =
        document.querySelector(`.Background`);
      const MainNav: HTMLDivElement | null = document.querySelector(`.MainNav`);
      const MainNavLine: HTMLDivElement | null =
        document.querySelector(`.MainNavLine`);
      const MainNavBorderLeft: HTMLDivElement | null =
        document.querySelector(`.MainNav .BorderLeft`);
      const MainNavBorderRight: HTMLDivElement | null = document.querySelector(
        `.MainNav .BorderRight`
      );
      if (
        GlobalHeader !== null &&
        Background !== null &&
        GlobalHeaderBorderLeft !== null &&
        GlobalHeaderBorderCenter !== null &&
        GlobalHeaderBorderRight !== null &&
        MainNav !== null &&
        MainNavLine !== null &&
        MainNavBorderLeft !== null &&
        MainNavBorderRight !== null
      ) {
        const targetScrollPoint = 400;
        const MainNavScrollTop = MainNavLine.getBoundingClientRect().top;
        if (scrollY > 0) {
          GlobalHeader.style.background = `rgba(21, 21, 21, 0.6)`;
          GlobalHeader.style.backdropFilter = `blur(4px)`;
          GlobalHeaderBorderLeft.style.left = `0%`;
          GlobalHeaderBorderRight.style.right = `0%`;
          if (MainNavScrollTop <= 64) {
            GlobalHeaderBorderLeft.style.opacity = `0`;
            GlobalHeaderBorderCenter.style.opacity = `0`;
            GlobalHeaderBorderRight.style.opacity = `0`;
            MainNavBorderLeft.style.left = `0%`;
            MainNavBorderRight.style.right = `0%`;
            MainNav.style.position = "fixed";
            MainNav.style.top = "64px";
            MainNav.style.left = "0";
            MainNav.style.right = "0";
            MainNav.style.background = `rgba(21, 21, 21, 0.6)`;
            MainNav.style.backdropFilter = `blur(4px)`;
          } else {
            GlobalHeaderBorderLeft.style.opacity = `1`;
            GlobalHeaderBorderCenter.style.opacity = `1`;
            GlobalHeaderBorderRight.style.opacity = `1`;
            MainNavBorderLeft.style.left = `100%`;
            MainNavBorderRight.style.right = `100%`;
            MainNav.style.position = "relative";
            MainNav.style.top = "initial";
            MainNav.style.left = "initial";
            MainNav.style.right = "initial";
            MainNav.style.background = `rgba(0, 0, 0, 1)`;
            MainNav.style.backdropFilter = `blur(0px)`;
          }
        } else {
          GlobalHeader.style.background = `rgba(0, 0, 0, 0)`;
          GlobalHeader.style.backdropFilter = `blur(0px)`;
          GlobalHeaderBorderLeft.style.left = `100%`;
          GlobalHeaderBorderRight.style.right = `100%`;
        }
        Background.style.opacity = `${
          (targetScrollPoint - scrollY) / targetScrollPoint
        }`;
      }
      const Sections: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(`.Section`);
      const NavBtns: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(`.NavBtn`);
      if (Intro !== null) {
        for (let i = 0; i < Sections.length; i += 1) {
          const IntroHeight = Intro.offsetHeight;
          sectionHeights[0] = IntroHeight;
          const Section: HTMLDivElement = Sections[i];
          sectionHeights[i + 1] = Section.offsetHeight;
          const prevHeights = sectionHeights.slice(0, i + 1);
          const targetHeights = sectionHeights.slice(0, i + 2);
          const prevHeight = prevHeights.reduce(function add(a, b) {
            return a + b;
          }, 0);
          const sumHeight = targetHeights.reduce(function add(a, b) {
            return a + b;
          }, 0);
          const allHeight = sectionHeights.reduce(function add(a, b) {
            return a + b;
          }, 0);
          if (
            scrollY + 64 + 44 >= prevHeight &&
            scrollY + 64 + 44 < sumHeight
          ) {
            NavBtns[i].style.opacity = `1`;
          } else {
            NavBtns[i].style.opacity = `0.4`;
            if (scrollY <= sectionHeights[1]) {
              NavBtns[0].style.opacity = `1`;
            }
            if (scrollY + 64 + 44 >= allHeight) {
              NavBtns[Sections.length - 1].style.opacity = `1`;
            }
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener(`resize`, handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <Background setReady={setReady} />
      <Content ready={ready} />
      <Footer />
    </>
  );
}

function Background({
  setReady,
}: {
  setReady: Dispatch<SetStateAction<boolean>>;
}) {
  const onVideoReady = () => {
    setReady(true);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: 0,
        p: theme.spacing(`100vh`, 0, 0, 0),
        zIndex: -1,
        "& video": {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
        },
      }}
      className="Background"
    >
      <ReactPlayer
        url={`videos/universe-02.mp4`}
        autoPlay
        playing
        muted
        loop
        playsinline
        onReady={onVideoReady}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 1) 100%)`,
        }}
      />
    </Box>
  );
}

function Content({ ready }: { ready: boolean }) {
  return (
    <Box
      sx={{
        position: "relative",
        p: theme.spacing(`64px`, 0, 0, 0),
        zIndex: 2,
      }}
    >
      {/* <BeltBanner /> */}
      <Intro ready={ready} />
      <MainNav />
      <Main />
    </Box>
  );
}

function Intro({ ready }: { ready: boolean }) {
  const { ref, inView } = useInView();
  const [className, setClassName] = useState<string>("");
  useEffect(() => {
    if (ready) setClassName("shown");
  }, [inView, ready]);
  const tempPress = () => {
    setClassName(className !== "" ? "" : "shown");
  };
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 0,
        p: theme.spacing(`800px`, 0, 0, 0),
        zIndex: -1,
        "@media(max-width: 480px)": {
          p: theme.spacing(`640px`, 0, 0, 0),
        },
      }}
      onClick={tempPress}
      ref={ref}
      className="Intro"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          background: `linear-gradient(rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 1) 100%)`,
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              transform: `rotate(-90deg)`,
              transition: `all 1s ease-in-out`,
              "&.shown": {
                transform: `rotate(0deg)`,
              },
              "& *": {
                textAlign: "center",
              },
            }}
            className={className}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%)`,
                width: 300,
                zIndex: -1,
                opacity: 0.6,
                transition: `all 0.35s ease-in-out`,
                transitionDelay: `1s`,
                "& img": {
                  width: "100%",
                  height: "auto",
                  transitionDelay: `1s !important`,
                  transition: `all 2s ease-in-out`,
                  transform: `scale(1)`,
                },
                "&.shown": {
                  transform: `translate(-50%, -50%)`,
                },
                "@media(max-width: 480px)": {
                  width: 172,
                },
              }}
              className={className}
            >
              <img src="images/iphone.png" />
            </Box>
            <Box
              sx={{
                height: "608px",
                position: "relative",
                transform: `rotate(90deg)`,
                transition: `all 1s ease-in-out`,
                "&.shown": {
                  transform: `rotate(0deg)`,
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
              className={className}
            >
              <Box
                sx={{
                  transform: "translateY(88px)",
                  transition: `all 1s ease`,
                  transitionDelay: `0s`,
                  width: 240,
                  height: 84,
                  "& img": {
                    width: "auto",
                    height: "100%",
                  },
                  "&.shown": {
                    transform: "translateY(0)",
                    height: 48,
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  m: theme.spacing(0, 0, 0.5, 0),
                }}
                className={className}
              >
                <img src="logos/shorts-horizontal.png" />
                <Box
                  sx={{
                    overflow: "hidden",
                    width: 0,
                    transition: `all 0.5s ease`,
                    transitionDelay: `0s`,
                    "&.shown": {
                      width: 38,
                    },
                  }}
                  className={className}
                >
                  <Typography
                    sx={{
                      fontSize: 36,
                      lineHeight: "44px",
                      fontWeight: "900",
                      m: theme.spacing(0, 0, 0, 1),
                    }}
                  >
                    로
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  opacity: 0,
                  transition: `all 1s ease`,
                  transitionDelay: `0s`,
                  "&.shown": {
                    opacity: 1,
                  },
                }}
                className={className}
              >
                <Typography
                  sx={{
                    fontSize: 40,
                    lineHeight: 1.2,
                    fontWeight: "900",
                  }}
                >
                  광고의 역사를
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 56,
                      lineHeight: 1.2,
                      fontWeight: "900",
                      position: "relative",
                      m: theme.spacing(0, 1, 0, 0),
                      overflowX: "visible",
                      overflowY: "hidden",
                      "& *": {
                        transition: `all 1s ease`,
                      },
                      "& .none": {
                        opacity: 0,
                        color: "transparent !important",
                      },
                      "& .horizontal": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        color: `#ffffff`,
                        transform: `translateY(0)`,
                        opacity: 1,
                        "&.shown": {
                          opacity: 0,
                          transform: `translateY(-100%)`,
                          transitionDelay: `2.5s`,
                        },
                      },
                      "& .vertical": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        transform: `translateY(100%)`,
                        color: `transparent`,
                        WebkitTextStroke: `1px #ffffff`,
                        opacity: 0,
                        "&.shown": {
                          opacity: 1,
                          transform: `translateY(0)`,
                          transitionDelay: `2.5s`,
                        },
                      },
                    }}
                  >
                    <span className={`none`}>세로 </span>
                    <span className={`horizontal ${className}`}>새로 </span>
                    <span className={`vertical ${className}`}>세로</span>
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline-block",
                      fontSize: 56,
                      lineHeight: 1.2,
                      fontWeight: "900",
                    }}
                  >
                    쓰다
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      m: theme.spacing(2, 0, 0, 0),
                      fontSize: 16,
                      lineHeight: `24px`,
                      color: grey[400],
                      transform: `translateY(100%)`,
                      transition: `all 0.5s ease`,
                      opacity: 0,
                      "&.shown": {
                        opacity: 1,
                        transform: `translateY(0)`,
                        transitionDelay: `1s`,
                      },
                    }}
                    className={className}
                  >
                    최대 600%의 효율의 쇼츠 광고,
                  </Typography>
                </Box>
                <Box
                  sx={{
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 16,
                      lineHeight: `24px`,
                      color: grey[400],
                      transform: `translateY(100%)`,
                      transition: `all 0.5s ease`,
                      opacity: 0,
                      "&.shown": {
                        opacity: 1,
                        transform: `translateY(0)`,
                        transitionDelay: `1.5s`,
                      },
                    }}
                    className={className}
                  >
                    No.1 유하에서 만나보세요.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 56,
                overflow: "hidden",
                "@media(max-width: 480px)": {
                  bottom: 120,
                },
              }}
            >
              <Button
                sx={{
                  m: theme.spacing(3, 0, 0, 0),
                  transition: `all 1s ease`,
                  transitionDelay: `0s`,
                  opacity: 0,
                  "&.shown": {
                    opacity: 1,
                  },
                }}
                className={className}
              >
                지금 바로 문의하기
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function Main() {
  return (
    <Box
      sx={{
        backgroundColor: `#000000`,
        width: "100%",
      }}
    >
      <Section index={0}>1</Section>
      <Section index={1}>2</Section>
      <Section index={2}>3</Section>
      <Section index={3}>4</Section>
    </Box>
  );
}

function Section({
  index,
  children,
}: {
  index: number;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        height: 1000,
      }}
      className={`Section Section${index}`}
    >
      <Container>{children}</Container>
    </Box>
  );
}

function Footer() {
  return <Box sx={{ height: 1000 }} />;
}
