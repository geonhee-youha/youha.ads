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
import Shorts from "../components/templates/index/shorts";
import Section01 from "../components/templates/index/Section01";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Index() {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      let sectionHeights = [0, 0, 0, 0];
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
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
      const BeltBanner: HTMLDivElement | null =
        document.querySelector(`.BeltBanner`);
      const BeltBannerHeight = BeltBanner?.offsetHeight ?? 0;
      if (
        GlobalHeader !== null &&
        Background !== null &&
        GlobalHeaderBorderLeft !== null &&
        GlobalHeaderBorderCenter !== null &&
        GlobalHeaderBorderRight !== null &&
        MainNav !== null &&
        MainNavLine !== null &&
        MainNavBorderLeft !== null &&
        MainNavBorderRight !== null &&
        Intro !== null
      ) {
        const targetScrollPoint = windowHeight / 3;
        const MainNavScrollTop = MainNavLine.getBoundingClientRect().top;
        if (scrollY > 0) {
          GlobalHeader.style.background = `rgba(21, 21, 21, 0.6)`;
          GlobalHeader.style.backdropFilter = `blur(4px)`;
          GlobalHeaderBorderLeft.style.left = `0%`;
          GlobalHeaderBorderRight.style.right = `0%`;
          if (MainNavScrollTop <= 64 + BeltBannerHeight) {
            GlobalHeaderBorderLeft.style.opacity = `0`;
            GlobalHeaderBorderCenter.style.opacity = `0`;
            GlobalHeaderBorderRight.style.opacity = `0`;
            MainNavBorderLeft.style.left = `0%`;
            MainNavBorderRight.style.right = `0%`;
            MainNav.style.position = "fixed";
            MainNav.style.top = `${BeltBannerHeight + 64}px`;
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
            MainNav.style.background = `rgba(21, 21, 21, 0)`;
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
        Intro.style.opacity = `${
          (targetScrollPoint - scrollY) / targetScrollPoint
        }`;
        Intro.style.transform = `translateY(-${(scrollY / 30) * 2}px)`;
        if (Intro !== null) {
          if (scrollY >= 44) {
            Intro.style.zIndex = `-1`;
          } else {
            Intro.style.zIndex = `1`;
          }
        }
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
            scrollY + 64 * 2 + BeltBannerHeight >= prevHeight &&
            scrollY + 64 * 2 + BeltBannerHeight < sumHeight
          ) {
            NavBtns[i].style.opacity = `1`;
          } else {
            NavBtns[i].style.opacity = `0.4`;
            if (scrollY <= sectionHeights[1]) {
              NavBtns[0].style.opacity = `1`;
            }
            if (scrollY + 64 * 2 + BeltBannerHeight >= allHeight) {
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
      <Background ready={ready} setReady={setReady} />
      <Content ready={ready} />
      <Footer />
    </>
  );
}

function Background({
  ready,
  setReady,
}: {
  ready: boolean;
  setReady: Dispatch<SetStateAction<boolean>>;
}) {
  const onVideoReady = () => {
    setReady(true);
  };
  return (
    <>
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
            background: `linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 1) 100%), linear-gradient(rgba(0, 0, 0, 0) ${
              800 / 2
            }px, rgba(0, 0, 0, 1) 100%)`,
            "@media(max-width: 480px)": {
              background: `linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 1) 100%), linear-gradient(rgba(0, 0, 0, 0) ${
                640 / 2
              }px, rgba(0, 0, 0, 1) 100%)`,
            },
          }}
        />
      </Box>
    </>
  );
}

function Content({ ready }: { ready: boolean }) {
  const { ref, inView } = useInView();
  const [className, setClassName] = useState<string>("");
  useEffect(() => {
    if (ready) setClassName("shown");
  }, [inView, ready]);
  const tempPress = () => {
    setClassName(className !== "" ? "" : "shown");
  };
  const onClickButton = (e: any) => {
    e.stopPropagation();
    const element: HTMLDivElement | null = document.querySelector(
      `.Section${3}`
    );
    const BeltBanner: HTMLDivElement | null =
      document.querySelector(`.BeltBanner`);
    const BeltBannerHeight = BeltBanner?.offsetHeight ?? 0;
    if (element !== null) {
      window.scrollTo({
        top: element.offsetTop - 64 - 44 - BeltBannerHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  };
  const webHeight = 960;
  const mobileHeight = 640;
  return (
    <>
      <Box
        sx={{
          p: theme.spacing(`calc(${webHeight}px)`, 0, 0, 0),
          "@media(max-width: 480px)": {
            p: theme.spacing(`calc(${mobileHeight}px)`, 0, 0, 0),
          },
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: 64 + 40,
          left: 0,
          right: 0,
          width: "100%",
          p: theme.spacing(`calc(${webHeight}px - 64px - 40px)`, 0, 0, 0),
          "@media(max-width: 480px)": {
            top: 64 + 56,
            p: theme.spacing(`calc(${mobileHeight}px -  64px - 56px)`, 0, 0, 0),
          },
        }}
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
          }}
        >
          <Container
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
            onClick={tempPress}
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
            </Box>
          </Container>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              right: 0,
              bottom: 172,
              width: 240,
              transform: `translateX(-50%)`,
              "@media(max-width: 480px)": {
                bottom: 80,
                width: 240,
              },
            }}
          >
            <Button
              sx={{
                m: theme.spacing(3, 0, 0, 0),
                transition: `all 1s ease`,
                opacity: 0,
                transform: `scale(0.8)`,
                "&.shown": {
                  transitionDelay: `2s`,
                  opacity: 1,
                  transform: `scale(1)`,
                },
              }}
              className={className}
              onClick={onClickButton}
            >
              지금 바로 문의하기
            </Button>
          </Box>
        </Box>
      </Box>
      <MainNav />
      <Main />
    </>
  );
}

function Main() {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Section01 />
      <Section index={1}>
        <SectionInner>
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "40px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              No.1 플랫폼, 유하
            </Typography>
            <Typography
              sx={{
                fontSize: 48,
                lineHeight: "60px",
                fontWeight: "900",
                textAlign: "center",
                // background: `radial-gradient(#eff1ff,black 80%)`,
                // backgroundPosition: `50% 75%`,
                // backgroundSize: `100% 200%`,
                // WebkitBackgroundClip: `text`,
                // WebkitTextFillColor: `transparent`,
              }}
            >
              압도적인 가입자.
              <br />
              압도적인 데이터.
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "400",
                m: theme.spacing(2, 0, 0, 0),
                textAlign: "center",
                color: grey[400],
              }}
            >
              유하는 국내 모든
              <br />
              광고주와 대행사, 유튜버가 사용하는
              <br />
              No.1 유튜버 광고 플랫폼입니다.
            </Typography>
          </Box>
        </SectionInner>
        <SectionInner>
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "40px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              광고 전문, 유하
            </Typography>
            <Typography
              sx={{
                fontSize: 48,
                lineHeight: "60px",
                fontWeight: "900",
                textAlign: "center",
                // background: `radial-gradient(#eff1ff,black 80%)`,
                // backgroundPosition: `50% 75%`,
                // backgroundSize: `100% 200%`,
                // WebkitBackgroundClip: `text`,
                // WebkitTextFillColor: `transparent`,
              }}
            >
              JTBC부터
              <br />
              서울대까지.
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "400",
                m: theme.spacing(2, 0, 0, 0),
                textAlign: "center",
                color: grey[400],
              }}
            >
              유하는 더 나은 서비스 제공을 위해
              <br />
              국내 최대 방송사들, MCN들,
              <br />
              서울대 유튜브연구회가 함께합니다.
            </Typography>
          </Box>
        </SectionInner>
      </Section>
      <Section index={2}>
        <SectionInner>
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "40px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              실제 목소리
            </Typography>
            <Typography
              sx={{
                fontSize: 48,
                lineHeight: "60px",
                fontWeight: "900",
                textAlign: "center",
                // background: `radial-gradient(#eff1ff,black 80%)`,
                // backgroundPosition: `50% 75%`,
                // backgroundSize: `100% 200%`,
                // WebkitBackgroundClip: `text`,
                // WebkitTextFillColor: `transparent`,
              }}
            >
              사용후기를
              <br />
              확인하세요.
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "400",
                m: theme.spacing(2, 0, 0, 0),
                textAlign: "center",
                color: grey[400],
              }}
            >
              유하와 함께한
              <br />
              실제 마케터들과 유튜버들의 목소리를
              <br />
              확인해 보세요.
            </Typography>
          </Box>
        </SectionInner>
      </Section>
      <Section index={3}>
        <SectionInner>
          <Box>
            <Typography
              sx={{
                fontSize: 20,
                lineHeight: "40px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              기간 혜택
            </Typography>
            <Typography
              sx={{
                fontSize: 48,
                lineHeight: "60px",
                fontWeight: "900",
                textAlign: "center",
                // background: `radial-gradient(#eff1ff,black 80%)`,
                // backgroundPosition: `50% 75%`,
                // backgroundSize: `100% 200%`,
                // WebkitBackgroundClip: `text`,
                // WebkitTextFillColor: `transparent`,
              }}
            >
              지금 문의하면
              <br />
              50% 할인
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: "400",
                m: theme.spacing(2, 0, 0, 0),
                textAlign: "center",
                color: grey[400],
              }}
            ></Typography>
          </Box>
        </SectionInner>
      </Section>
    </Box>
  );
}

export function Section({
  index,
  children,
}: {
  index: number;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        p: theme.spacing(6, 0),
        "@media(max-width: 480px)": {
          p: theme.spacing(6, 0),
        },
      }}
      className={`Section Section${index}`}
    >
      {children}
    </Box>
  );
}

export function SectionInner({ children }: { children?: React.ReactNode }) {
  return (
    <Box
      sx={{
        height: 1200,
        p: theme.spacing(2, 0),
        "@media(max-width: 480px)": {
          height: 800,
          p: theme.spacing(2, 0),
        },
      }}
    >
      {children}
    </Box>
  );
}

function Footer() {
  return <Box sx={{ height: 1000 }} />;
}
