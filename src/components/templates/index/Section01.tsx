import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dynamic from "next/dynamic";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, EffectCoverflow } from "swiper";
import SwipeableViews from "react-swipeable-views";
import { Section, SectionInner } from "../../../pages";
import { theme } from "../../../themes/theme";
import Icon from "../../atoms/Icon";
import Link from "next/link";
import Container from "../../atoms/Container";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

const shorts = [
  {
    href: "https://www.youtube.com/shorts/B8eZaKju6yE",
    url: "videos/shorts/00.mp4",
    title: "컴포트에어",
    channel: {
      src: "https://yt3.googleusercontent.com/GJTEP3EEhz2NGWzu2tj6tSfe3OY_UOpSrUmOU4V_HyF-_eIlfOO8VWDM8_EVUVl7FWp2WHi-qw=s176-c-k-c0x00ffffff-no-rj",
      title: "한살차이 [Hansal]",
      subscribers: "59.8만명",
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
      subscribers: "17.3만명",
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
      subscribers: "17.3만명",
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
      subscribers: "17.3만명",
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
      subscribers: "17.3만명",
    },
    views: "100만",
    likes: "4만",
    comments: "2,000",
    desc: "동채널 롱폼 대비 단가 60%, 조회수 300%",
  },
];

export default function Section01() {
  const swipeableViewsRef = useRef<any>(null);
  const [swiper, setSwiper] = useState<any>(null);
  const [swiperIndex, setSwiperIndex] = useState<number>(2);
  const [viewIndex, setViewIndex] = useState<number>(0);
  return (
    <Section index={0}>
      <SectionInner>
        <Container
          sx={{
            p: theme.spacing(10, 0),
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 20,
                  lineHeight: "40px",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                유튜브 쇼츠
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
                더 저렴하게.
                <br />더 확실하게.
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
                유튜브 쇼츠를 활용한 광고는
                <br />
                롱폼 광고 대비 훨씬 낮은 가격에 진행 가능하며
                <br />
                최대 5배의 효율을 자랑합니다.
              </Typography>
            </Box>
          </Box>
        </Container>
        <Videos2
          swiper={swiper}
          setSwiper={setSwiper}
          swiperIndex={swiperIndex}
          setSwiperIndex={setSwiperIndex}
        />
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
            유하애즈
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
            몇명이던
            <br />상관없어요.
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
            내 브랜드와 맞는 유튜버들 선정부터
            <br />
            단가 협의, 계약 및 추후 전환관리까지
            <br />
            유하애즈에서 한번에 가능합니다.
          </Typography>
        </Box>
      </SectionInner>
    </Section>
  );
}

function Paginations({
  swipeableViewsRef,
  viewIndex,
  setViewIndex,
}: {
  swipeableViewsRef: any;
  viewIndex: number;
  setViewIndex: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Stack direction="row" alignItems="flex-end" spacing={2}>
      {shorts.map((item, index) => {
        const focused = index === viewIndex;
        const { href, url, title, channel, views, likes, desc } = item;
        const width = focused ? 72 : 64;
        const onClick = () => {
          setViewIndex(index);
        };
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              cursor: "pointer",
              "& *": {
                cursor: "pointer",
              },
            }}
            onClick={onClick}
          >
            <Box
              sx={{
                position: "relative",
                width: width,
                height: (width / 9) * 16,
                transition: `all 0.5s ease`,
                borderRadius: 1,
                overflow: "hidden",
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
                boxShadow: `4px 4px 16px 4px rgba(0, 0, 0, 0.6)`,
              }}
            >
              <ReactPlayer url={url} playing={false} muted loop playsinline />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `rgba(0, 0, 0, ${focused ? 0 : 0.4})`,
                  transition: `all 0.5s ease`,
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

function Videos({
  swiper,
  setSwiper,
  swiperIndex,
  setSwiperIndex,
}: {
  swiper: any;
  setSwiper: Dispatch<SetStateAction<any>>;
  swiperIndex: number;
  setSwiperIndex: Dispatch<SetStateAction<number>>;
}) {
  const onSlideChange = (swiper: any) => {
    setSwiperIndex(swiper.realIndex);
  };
  const height = 800 - 376;
  return (
    <Box
      sx={{
        width: "100%",
        "& .swiper": {
          width: "100%",
          "& .swiper-slide": {
            width: (height / 16) * 9,
            height: height,
            borderRadius: 1,
            overflow: "hidden",
            cursor: "pointer",
            "& .cover": {
              opacity: 0,
            },
            "&:not(.swiper-slide-active)": {
              "& .cover": {
                opacity: 1,
              },
            },
            "& *": {
              cursor: "pointer",
            },
            "& a": {
              width: "100%",
              height: "100%",
            },
            "& a > div:first-child": {
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
          },
        },
      }}
    >
      <Swiper
        onSwiper={setSwiper}
        onSlideChange={onSlideChange}
        grabCursor={true}
        // effect={"cards"}
        // modules={[EffectCards]}
        effect={"coverflow"}
        modules={[EffectCoverflow]}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
        initialSlide={2}
      >
        {shorts.map((item, index) => {
          const focused = index === swiperIndex;
          const { href, url, title, channel, views, likes, comments, desc } =
            item;
          return (
            <SwiperSlide key={index}>
              <Link href={href}>
                <a target="_blank">
                  <ReactPlayer
                    url={url}
                    playing={focused}
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
                      background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))`,
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        p: theme.spacing(2),
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
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
                      <Stack
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                        sx={{
                          position: "absolute",
                          right: 0,
                          bottom: 0,
                          width: "auto",
                          p: theme.spacing(2),
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Icon name="eye" color="#ffffff" prefix="fad" />
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: "700",
                            }}
                          >
                            {views}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Icon name="thumbs-up" color="#ffffff" prefix="fad" />
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: "700",
                            }}
                          >
                            {likes}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Icon name="comment" color="#ffffff" prefix="fad" />
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: "700",
                            }}
                          >
                            {comments}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `rgba(0, 0, 0, 0.8)`,
                      transition: `all 0.35s ease`,
                    }}
                    className="cover"
                  />
                </a>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

function Videos2({
  swiper,
  setSwiper,
  swiperIndex,
  setSwiperIndex,
}: {
  swiper: any;
  setSwiper: Dispatch<SetStateAction<any>>;
  swiperIndex: number;
  setSwiperIndex: Dispatch<SetStateAction<number>>;
}) {
  const onSlideChange = (swiper: any) => {
    setSwiperIndex(swiper.realIndex);
  };
  const height = 800 - 376;
  const width = (height / 16) * 9;
  return (
    <Container>
      <Box
        sx={{
          width: width,
          "& .swiper": {
            width: "100%",
            "& .swiper-slide": {
              width: width,
              height: height,
              borderRadius: 1,
              overflow: "hidden",
              cursor: "pointer",
              "& .cover": {
                opacity: 0,
              },
              "&:not(.swiper-slide-active)": {
                "& .cover": {
                  opacity: 1,
                },
              },
              "& *": {
                cursor: "pointer",
              },
              "& a": {
                width: "100%",
                height: "100%",
              },
              "& a > div:first-child": {
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
            },
          },
        }}
      >
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={onSlideChange}
          grabCursor={true}
          effect={"cards"}
          modules={[EffectCards]}
        >
          {shorts.map((item, index) => {
            const focused = index === swiperIndex;
            const { href, url, title, channel, views, likes, comments, desc } =
              item;
            return (
              <SwiperSlide key={index}>
                <Link href={href}>
                  <a target="_blank">
                    <ReactPlayer
                      url={url}
                      playing={focused}
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
                        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))`,
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-end",
                          p: theme.spacing(2),
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
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
                        <Stack
                          justifyContent="flex-end"
                          alignItems="center"
                          spacing={2}
                          sx={{
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            width: "auto",
                            p: theme.spacing(2),
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <Icon name="eye" color="#ffffff" prefix="fad" />
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: "700",
                              }}
                            >
                              {views}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <Icon
                              name="thumbs-up"
                              color="#ffffff"
                              prefix="fad"
                            />
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: "700",
                              }}
                            >
                              {likes}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-end",
                              alignItems: "center",
                            }}
                          >
                            <Icon name="comment" color="#ffffff" prefix="fad" />
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: "700",
                              }}
                            >
                              {comments}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `rgba(0, 0, 0, 0.8)`,
                        transition: `all 0.35s ease`,
                      }}
                      className="cover"
                    />
                  </a>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Container>
  );
}
