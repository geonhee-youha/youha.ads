import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Container from "../components/atoms/Container";
import { theme } from "../themes/theme";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { grey } from "@mui/material/colors";
import Button from "../components/atoms/Button";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function Index() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const GlobalHeader: HTMLDivElement | null =
        document.querySelector(`.GlobalHeader`);
      const Background: HTMLDivElement | null =
        document.querySelector(`.Background`);
      if (GlobalHeader !== null && Background !== null) {
        const targetScrollPoint = 400;
        GlobalHeader.style.backgroundColor = `rgba(0, 0, 0, ${
          scrollY / targetScrollPoint
        })`;
        Background.style.opacity = `${
          (targetScrollPoint - scrollY) / targetScrollPoint
        }`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Background />
      <Content />
    </>
  );
}

function Background() {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: 0,
        p: theme.spacing(`100vh`, 0, 0, 0),
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

function Content() {
  return (
    <Box
      sx={{
        position: "relative",
        p: theme.spacing(`64px`, 0, 0, 0),
        zIndex: 2,
      }}
    >
      {/* <BeltBanner /> */}
      <Main />
    </Box>
  );
}

function Main() {
  const { ref, inView } = useInView();
  const [className, setClassName] = useState<string>("");
  useEffect(() => {
    setClassName("shown");
  }, [inView]);
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
      }}
      ref={ref}
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
                onClick={tempPress}
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
                  미디어 광고를
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
                      overflow: "hidden",
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
                        transitionDelay: `2.5s`,
                        "&.shown": {
                          transform: `translateY(-100%)`,
                        },
                      },
                      "& .vertical": {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        // color: "transparent !important",
                        // WebkitTextStroke: `1px #ffffff`,
                        // color: mainColor[500],
                        transform: `translateY(100%)`,
                        transitionDelay: `2.5s`,
                        "&.shown": {
                          transform: `translateY(0)`,
                        },
                      },
                    }}
                  >
                    <span className={`none`}>세로 </span>
                    <span className={`horizontal ${className}`}>새로 </span>
                    <span className={`vertical ${className}`}>세로 </span>
                  </Typography>
                  <Typography
                    sx={{
                      display: "inline-block",
                      fontSize: 56,
                      lineHeight: 1.2,
                      fontWeight: "900",
                    }}
                  >
                    쓰자
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
                      transitionDelay: `1s`,
                      opacity: 0,
                      "&.shown": {
                        opacity: 1,
                        transform: `translateY(0)`,
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
                      transitionDelay: `1.5s`,
                      opacity: 0,
                      "&.shown": {
                        opacity: 1,
                        transform: `translateY(0)`,
                      },
                    }}
                    className={className}
                  >
                    No.1 유하에서 만나보세요.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 56,
                    overflow: "hidden",
                  }}
                >
                  <Button
                    sx={{
                      m: theme.spacing(3, 0, 0, 0),
                      transform: `translateY(100%)`,
                      transition: `all 0.5s ease`,
                      transitionDelay: `2s`,
                      opacity: 0,
                      "&.shown": {
                        opacity: 1,
                        transform: `translateY(0)`,
                      },
                    }}
                    className={className}
                  >
                    지금 바로 문의하기
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: `#000000`,
          width: "100%",
          height: `2000px`,
        }}
      >
        <Container></Container>
      </Box>
    </Box>
  );
}
