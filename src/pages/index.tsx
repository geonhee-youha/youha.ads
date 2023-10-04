import { Box, ButtonBase, Rating, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Visual from "../components/atoms/Visual";
import { theme } from "../themes/theme";
import Typo from "../components/atoms/Typo";
import { comma } from "../utils";
import { grey } from "@mui/material/colors";
import youhaBlue from "../constants/youhaBlue";
import Icon from "../components/atoms/Icon";
import { YoutuberProps, youtubers } from "../data";
import Link from "next/link";
import _ from "lodash";

type TagProps = {
  label: string;
  backgroundColor: string;
  textColor: string;
};

function Tag({ size, item }: { size?: string; item: string }) {
  const md = size === "md";
  const mdSx = {
    p: theme.spacing(0, 1),
    height: 24,
    fontSize: 12,
    lineHeght: "16px",
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        p: md ? mdSx.p : theme.spacing(0, 0.75),
        borderRadius: 0.5,
        height: md ? mdSx.height : 20,
        backgroundColor: grey[200],
      }}
    >
      <Typography
        sx={{
          fontSize: md ? mdSx.fontSize : 10,
          lineHeght: md ? mdSx.lineHeght : "14px",
          fontWeight: "700",
          color: grey[600],
        }}
      >
        {item}
      </Typography>
    </Box>
  );
}

function Youtuber({ index, item }: { index: number; item: YoutuberProps }) {
  const datas = [
    {
      label: "구독자수",
      value: `${comma(item.quantity.subscribers)}명`,
    },
    {
      label: "평균 조회수",
      value: `${comma(item.quantity.averageViews)}회`,
    },
    {
      label: "조회수/구독자",
      value: `${(item.quantity.viewsPerSubscribers * 100).toFixed(0)}%`,
    },
    {
      label: "좋아요/조회수",
      value: `${item.quantity.likesPerViews.toFixed(2)}%`,
    },
    {
      label: "댓글/조회수",
      value: `${item.quantity.commentsPerViews.toFixed(2)}%`,
    },
  ];
  return (
    <Box
      sx={{
        maxHeight: `113px`,
        boxShadow: `0 0 0 1px ${grey[300]} inset`,
        borderRadius: 2,
        p: theme.spacing(1.5, 2),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // background: `linear-gradient(90deg, rgba(21, 21, 21, 0.04), rgba(21, 21, 21, 0))`,
      }}
    >
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: "700",
          color: grey[500],
          textAlign: "center",
          width: 40,
          m: theme.spacing(0, 2, 0, 0),
        }}
      >
        {index + 1}
      </Typography>
      <Box sx={{ position: "relative", m: theme.spacing(0, 2, 0, 0) }}>
        <Visual
          src={item.thumbnail}
          sx={{
            width: 76,
            height: 76,
            borderRadius: 40,
            overflow: "hidden",
            border: `1px solid ${grey[300]}`,
          }}
        />
        <Link href={`https://www.youtube.com/channel/${item.id}`} passHref>
          <a
            target="_blank"
            href={`https://www.youtube.com/channel/${item.id}`}
            rel="noopener noreferrer"
          >
            <ButtonBase
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
                zIndex: 999,
                backgroundColor: `#ffffff`,
                width: 32,
                height: 32,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                "& img": {
                  width: "auto",
                  height: `20px`,
                },
                border: `1px solid ${grey[300]}`,
              }}
            >
              <img src="/images/youtube.svg" />
            </ButtonBase>
          </a>
        </Link>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: 12,
            lineHeight: "16px",
          }}
        >
          {item.category}
        </Typography>
        <Typo
          lines={2}
          sx={{
            fontSize: 18,
            lineHeight: "28px",
            fontWeight: "700",
            m: theme.spacing(0.25, 0, 0, 0),
          }}
        >
          {item.title}
        </Typo>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            m: theme.spacing(1, 0, 0, 0),
          }}
        >
          {item.tags.map((item, index) => {
            return <Tag key={index} item={item} size="md" />;
          })}
        </Stack>
      </Box>
      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{
            p: theme.spacing(0, 0, 1, 0),
            m: theme.spacing(0, 0, 1, 0),
            borderBottom: `1px solid ${grey[200]}`,
            maxHeight: `32px !important`,
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "24px",
              fontWeight: "700",
              color: youhaBlue[500],
            }}
          >
            {item.score.toFixed(1)}
          </Typography>
          <Rating
            name="read-only"
            value={item.score}
            readOnly
            sx={{
            }}
          />
        </Stack>
        <Stack direction={"row"} spacing={2}>
          {datas.map((item, index) => {
            return (
              <Box sx={{ minWidth: 80 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    lineHeight: "16px",
                    color: grey[700],
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    lineHeight: "20px",
                    fontWeight: "700",
                    m: theme.spacing(0.5, 0, 0, 0),
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}

export default function Index() {
  const router = useRouter();
  const youtuberList = _.chunk(youtubers, 10);

  return (
    <Box
      sx={{
        m: theme.spacing(0, "auto"),
        width: 1000,
      }}
    >
      <Box
        sx={{
          height: 1080,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            "& img": {
              width: "auto",
              height: 20,
            },
          }}
        >
          <img src="/logos/logo.png" />
        </Box>
        <Typography
          sx={{
            m: theme.spacing(4, 0, 0, 0),
            fontSize: 40,
            lineHeight: "56px",
            width: "100%",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          [세리박스] 세리번 나이트 V2
          <br />
          모집 결과 리포트
        </Typography>
        <Stack
          direction={"row"}
          spacing={5}
          justifyContent={"center"}
          sx={{
            m: theme.spacing(2.5, 0, 0, 0),
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
            }}
          >
            모집기간 : 09.18 ~ 09.27
          </Typography>
          <Typography
            sx={{
              fontSize: 20,
              lineHeight: "32px",
              "& b": {
                fontWeight: "700",
              },
            }}
          >
            총 지원자 : <b>{youtubers.length}</b> / 30명
          </Typography>
        </Stack>
      </Box>
      {youtuberList.map((item, index) => {
        console.log(item);
        return (
          <Box
            key={index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gridAutoRows: "1fr",
              gridTemplateRows: "auto auto",
              gridColumnGap: 16,
              gridRowGap: `4px`,
              p: theme.spacing(2.25, 0),
            }}
          >
            {item.map((item2, index2) => {
              return (
                <Youtuber
                  key={index2}
                  index={index * 10 + index2}
                  item={item2}
                />
              );
            })}
          </Box>
        );
      })}
      {/* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridAutoRows: "1fr",
          gridTemplateRows: "auto auto",
          gridColumnGap: 16,
          gridRowGap: `8px`,
          p: theme.spacing(2, 0),
          height: '1080px',
        }}
      >
        <Youtuber />
        <Youtuber />
        <Youtuber />
        <Youtuber />
        <Youtuber />
        <Youtuber />
        <Youtuber />
        <Youtuber />
        <Youtuber />
      </Box> */}
    </Box>
  );
}
