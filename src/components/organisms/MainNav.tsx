import { Box, Typography } from "@mui/material";
import { theme } from "../../themes/theme";
import Border from "../atoms/Border";
import Container from "../atoms/Container";

const navs = [
  {
    title: "서비스 소개",
    type: "default",
    className: "first",
  },
  {
    title: "유하 소개",
    type: "default",
    className: "second",
  },
  {
    title: "사용후기",
    type: "default",
    className: "third",
  },
  {
    title: "문의하기",
    type: "default",
    className: "fifth",
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
    <Box
      sx={{
        width: "100%",
        position: "relative",
        height: 44,
        zIndex: 99,
      }}
    >
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
          transition: `background 0.35s ease`,
        }}
        className="MainNav"
      >
        <Container
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              display: "flex",
              overflowX: "scroll",
            }}
          >
            {navs.map((item, index) => (
              <NavBtn key={index} index={index} item={item} />
            ))}
          </Box>
        </Container>
        <Border />
      </Box>
    </Box>
  );
}
