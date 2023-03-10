import { Box, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import Border from "../atoms/Border";
import Container from "../atoms/Container";

const navs = [
  {
    title: "쇼츠 효과",
    type: "default",
    className: "first",
  },
  {
    title: "최근 쇼츠",
    type: "default",
    className: "second",
  },
  {
    title: "기간 내 혜택",
    type: "default",
    className: "third",
  },
  {
    title: "문의하기",
    type: "default",
    className: "fourth",
  },
];

export default function MainNav() {
  function NavBtn({
    index,
    item,
  }: {
    index: number;
    item: { type: string; title: string; className: string };
  }) {
    const { title, className } = item;
    const onClick = () => {
      const element: HTMLDivElement | null = document.querySelector(
        `.Section${index}`
      );
      if (element !== null) {
        window.scrollTo({
          top: element.offsetTop - 64 - 44,
          left: 0,
          behavior: "smooth",
        });
      }
    };
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          m: theme.spacing(0, 2, 0, 0),
          p: theme.spacing(0, 0, 2, 0),
          cursor: "pointer",
          "&:hover": {
            opacity: `1 !important`,
          },
          "@media(max-width: 480px)": {
            "&.signup": { display: "none" },
          },
          opacity: index === 0 ? 1 : 0.4,
          transition: `all 0.5s ease`,
        }}
        onClick={onClick}
        className={`NavBtn NavBtn${index}`}
      >
        <Typography
          sx={{
            fontSize: 18,
            lineHeight: "28px",
            fontWeight: "700",
            color: `#ffffff`,
          }}
        >
          {title}
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ width: "100%", position: "relative", height: 44 }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
        className="MainNavLine"
      />
      <Box
        sx={{
          backgroundColor: `#000000`,
          transition: `background 0.35s ease`,
        }}
        className="MainNav"
      >
        <Container
          sx={{
            display: "flex",
          }}
        >
          {navs.map((item, index) => (
            <NavBtn key={index} index={index} item={item} />
          ))}
        </Container>
        <Border />
      </Box>
    </Box>
  );
}
