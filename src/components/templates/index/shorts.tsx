import { Box, SxProps, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { theme } from "../../../themes/theme";
import SwipeableViews from "react-swipeable-views";
import { grey } from "@mui/material/colors";
import Icon from "../../atoms/Icon";
import Link from "next/link";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const shorts = [
  {
    href: "https://www.youtube.com/shorts/B8eZaKju6yE",
    url: "videos/shorts/00.mp4",
    title: "컴포트에어",
    channel: {
      src: "https://yt3.googleusercontent.com/GJTEP3EEhz2NGWzu2tj6tSfe3OY_UOpSrUmOU4V_HyF-_eIlfOO8VWDM8_EVUVl7FWp2WHi-qw=s176-c-k-c0x00ffffff-no-rj",
      title: "한살차이 [Hansal]",
    },
    views: "200만",
    likes: "3.5만",
    comments: "700",
    desc: "동채널 롱폼 대비 단가 60%, 조회수 300%",
  },
  {
    href: "https://www.youtube.com/shorts/E1EYP4VpxI0",
    url: "videos/shorts/01.mp4",
    title: "제주위트에일",
    channel: {
      src: "https://yt3.googleusercontent.com/-TabvxQyCS5AIWK-MZSns4-jsE_8QJRNucpHmte1RPClaA2bfJGgwMv4dHA3zoKdjqk9stAzrA=s176-c-k-c0x00ffffff-no-rj",
      title: "닛몰캐쉬",
    },
    views: "100만",
    likes: "4만",
    comments: "2,000",
    desc: "동채널 롱폼 대비 단가 60%, 조회수 300%",
  },
  {
    href: "https://www.youtube.com/shorts/E1EYP4VpxI0",
    url: "videos/shorts/01.mp4",
    title: "제주위트에일",
    channel: {
      src: "https://yt3.googleusercontent.com/-TabvxQyCS5AIWK-MZSns4-jsE_8QJRNucpHmte1RPClaA2bfJGgwMv4dHA3zoKdjqk9stAzrA=s176-c-k-c0x00ffffff-no-rj",
      title: "닛몰캐쉬",
    },
    views: "100만",
    likes: "4만",
    comments: "2,000",
    desc: "동채널 롱폼 대비 단가 60%, 조회수 300%",
  },
  {
    href: "https://www.youtube.com/shorts/E1EYP4VpxI0",
    url: "videos/shorts/01.mp4",
    title: "제주위트에일",
    channel: {
      src: "https://yt3.googleusercontent.com/-TabvxQyCS5AIWK-MZSns4-jsE_8QJRNucpHmte1RPClaA2bfJGgwMv4dHA3zoKdjqk9stAzrA=s176-c-k-c0x00ffffff-no-rj",
      title: "닛몰캐쉬",
    },
    views: "100만",
    likes: "4만",
    comments: "2,000",
    desc: "동채널 롱폼 대비 단가 60%, 조회수 300%",
  },
  {
    href: "https://www.youtube.com/shorts/E1EYP4VpxI0",
    url: "videos/shorts/01.mp4",
    title: "제주위트에일",
    channel: {
      src: "https://yt3.googleusercontent.com/-TabvxQyCS5AIWK-MZSns4-jsE_8QJRNucpHmte1RPClaA2bfJGgwMv4dHA3zoKdjqk9stAzrA=s176-c-k-c0x00ffffff-no-rj",
      title: "닛몰캐쉬",
    },
    views: "100만",
    likes: "4만",
    comments: "2,000",
    desc: "동채널 롱폼 대비 단가 60%, 조회수 300%",
  },
];

export default function Shorts() {
  const swipeableViewsRef = useRef<any>(null);
  const [viewIndex, setViewIndex] = useState<number>(0);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& > div ": {
          width: "100%",
          m: theme.spacing(0, -1),
        },
        "& > div > div": {
          width: "100%",
        },
        "& > div > div > div": {
          flex: 1,
        },
      }}
    >
      <SwipeableViews
        ref={swipeableViewsRef}
        index={viewIndex}
        onChangeIndex={setViewIndex}
        enableMouseEvents
      >
        {shorts.map((item, index) => {
          return <Player key={index} index={index} item={item} />;
        })}
      </SwipeableViews>
      {/* <Typography
        sx={{
          fontSize: 40,
          fontWeight: "700",
        }}
      >
        롱폼 대비 5배 이상 효율
      </Typography> */}
    </Box>
  );
}

function Player({
  index,
  item,
}: {
  index: number;
  item: {
    href: string;
    url: string;
    title: string;
    channel: { src: string; title: string };
    views: string;
    likes: string;
    desc: string;
  };
}) {
  const { href, url, title, channel, views, likes, desc } = item;
  const [playing, setPlaying] = useState<boolean>(index === 0 ? true : false);
  const [className, setClassName] = useState<string>(
    index === 0 ? "hovered" : ""
  );
  const onMouseOver = () => {
    const Hovereds: NodeListOf<HTMLDivElement> =
      document.querySelectorAll(`.hovered`);
    for (let i = 0; i < Hovereds.length; i += 1) {
      Hovereds[i].className = Hovereds[i].className.replace('hovered', '');
    }
    setPlaying(true);
    setClassName("hovered");
  };
  const onMouseOut = () => {
    setPlaying(false);
    setClassName("");
  };
  return (
    <Box
      sx={{
        width: "100%",
        p: theme.spacing(3, 1, 0, 1),
      }}
    >
      <Link href={href} passHref>
        <Box
          sx={{
            position: "relative",
            transition: "all 0.35s ease",
            width: "100%",
            height: 0,
            p: theme.spacing(`${(16 / 9) * 100}%`, 0, 0, 0),
            backgroundColor: "#000000",
            overflow: "hidden",
            borderRadius: 1,
            cursor: "pointer !important",
            "& *": {
              cursor: "pointer !important",
            },
          }}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          className={className}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden",
              boxShadow: `4px 4px 20px 4px rgba(0, 0, 0, 0.6)`,
              "& > div": {
                width: "100% !important",
                height: "100% !important",
              },
              "& video": {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                objectFit: "cover",
              },
            }}
          >
            <ReactPlayer url={url} playing={playing} muted loop playsinline />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  p: theme.spacing(`48px`, 0, 0, 0),
                  background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1))`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    p: theme.spacing(2, 2, 2, 2),
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#ffffff",
                      boxShadow: `4px 4px 20px 4px rgba(0, 0, 0, 0.6)`,
                      borderRadius: "50%",
                      overflow: "hidden",
                      "& img": {
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  >
                    <img src={channel.src} />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      p: theme.spacing(0, 0, 0, 2),
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      {channel.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: "400",
                      }}
                    >
                      {title}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: 0,
                    transition: "all 0.35s ease",
                    "&.hovered": {
                      height: 88,
                    },
                  }}
                  className={className}
                >
                  <Box
                    sx={{
                      m: theme.spacing(0, 0, 0, 0),
                      p: theme.spacing(0, 2, 0, 2),
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        m: theme.spacing(0, 1, 0, 0),
                        display: "flex",
                      }}
                    >
                      <Icon name="eye" color={"#ffffff"} size={16} />
                      <Typography
                        sx={{
                          m: theme.spacing(0, 0, 0, 0.5),
                          fontSize: 14,
                          lineHeigt: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {views}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        m: theme.spacing(0, 1, 0, 0),
                        display: "flex",
                      }}
                    >
                      <Icon name="thumbs-up" color={"#ffffff"} size={16} />
                      <Typography
                        sx={{
                          m: theme.spacing(0, 0, 0, 0.5),
                          fontSize: 14,
                          lineHeigt: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {likes}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: theme.spacing(1, 2, 2, 2),
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        lineHeigt: "20px",
                        color: grey[400],
                      }}
                    >
                      {desc}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  );
}
