import { alpha, Box, ButtonBase, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { mainColor, theme } from "../../themes/theme";
import Container from "../atoms/Container";
import dayjs from "dayjs";

export function BeltBanner() {
  const timerRef: any = useRef();
  useEffect(() => {
    timerRef.current = setInterval(getTime, 10);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 64,
        left: 0,
        right: 0,
        width: '100%',
        height: 40,
        display: "flex",
        backgroundColor: alpha(mainColor[500], 0.6),
        zIndex: 9
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ButtonBase onClick={handleStop}>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: "700",
            }}
          >
            [오늘마감] 새로운 시작을 위한 50% 할인
          </Typography>
        </ButtonBase>
        <Typography
          sx={{
            fontSize: 14,
            lineHeight: "20px",
            "& .time": {
              p: theme.spacing(0, 0.5, 0, 0),
              fontFamily: `'Noto Sans Mono', monospace !important`,
              "& span": {
                display: "inline-block",
              },
            },
          }}
          className="date"
        >
          <span>종료까지</span>
          <span className="time">
            <span className="days"></span>
            <span className="hours"></span>:<span className="minutes"></span>:
            <span className="seconds"></span>:
            <span className="milliseconds"></span>
          </span>
          <span>남음</span>
        </Typography>
      </Container>
    </Box>
  );
}

function getTime() {
  const targetDate = dayjs("2023-03-12:13:02:00+0900");
  const nowDate = dayjs(new Date());
  const diff = targetDate.diff(nowDate);
  const date: any = document.querySelector(".date");
  const days: any = document.querySelector(".days");
  const hours: any = document.querySelector(".hours");
  const minutes: any = document.querySelector(".minutes");
  const seconds: any = document.querySelector(".seconds");
  const milliseconds: any = document.querySelector(".milliseconds");
  if (diff <= 0) {
    date.innerText = `이벤트가 종료되었습니다.`;
    return;
  }
  if (days !== null) {
    const day = Number(dayjs(diff).format("D")) - 1;
    if (day > 0) {
      days.innerText = `${day}일`;
      days.style.paddingLeft = `8px`;
      days.style.paddingRight = `8px`;
    } else {
      days.style.paddingLeft = `8px`;
    }
  }
  if (hours !== null) {
    hours.innerText = `${dayjs(diff).format("hh")}`;
  }
  if (hours !== null) {
    hours.innerText = `${dayjs(diff).format("hh")}`;
  }
  if (minutes !== null) {
    minutes.innerText = `${dayjs(diff).format("mm")}`;
  }
  if (seconds !== null) {
    seconds.innerText = `${dayjs(diff).format("ss")}`;
  }
  if (milliseconds !== null) {
    let ms = Math.floor(Number(dayjs(diff).format("SSS")) / 10);
    milliseconds.innerText = `${ms <= 9 ? `0${ms}` : ms}`;
  }
}
