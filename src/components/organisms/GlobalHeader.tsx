import { alpha, Box, ButtonBase, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { theme } from "../../themes/theme";
import Container from "../atoms/Container";
import Icon from "../atoms/Icon";
import Toolbar from "../atoms/Toolbar";

const headers = [
  {
    href: "/auth/signin",
    title: "로그인",
    type: "default",
    className: "signin",
  },
  {
    href: "/auth/signup",
    title: "회원가입",
    type: "default",
    className: "signup",
  },
];

const languages = [{ title: "KOR" }, { title: "ENG" }];

export default function GlobalHeader() {
  const router = useRouter();
  const pathnames = router.pathname.split("/");
  const focused = `/${pathnames[1]}` !== "/auth";
  const [languagesOpen, setLanguagesOpen] = useState<boolean>(false);
  const onClickLanguages = () => {
    setLanguagesOpen((prev) => !prev);
  };
  function HeaderBtn({
    item,
  }: {
    item: { type: string; href: string; title: string; className: string };
  }) {
    const { href, title, className } = item;
    return (
      <Link href={href} passHref>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            m: theme.spacing(0, 0, 0, 3),
            cursor: "pointer",
            "&:hover": {
              "& *": {
                color: grey[600],
              },
            },
            "@media(max-width: 480px)": {
              "&.signup": { display: "none" },
            },
          }}
          className={className}
        >
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Link>
    );
  }
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: `rgba(0, 0, 0, 0.6)`,
        transition: `all 0.35s ease`,
        display: focused ? "block" : "none",
        zIndex: 99,
      }}
      className="GlobalHeader"
    >
      <Container>
        <Toolbar>
          <Box
            sx={{
              m: theme.spacing(0, 3, 0, 0),
              "& img": {
                width: "auto",
                height: 24,
                cursor: "pointer",
              },
            }}
          >
            <Link href="/" passHref>
              <img src="/logos/youha-shorts_logo-white.png" />
            </Link>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {headers.map((item, index) => (
              <HeaderBtn key={index} item={item} />
            ))}
            <Box
              sx={{
                position: "relative",
                height: "100%",
                m: theme.spacing(0, 0, 0, 3),
                "@media(max-width: 480px)": {
                  display: "none",
                },
              }}
            >
              <IconButton
                sx={{
                  width: 24,
                  height: "100%",
                  borderRadius: "50%",
                  "&:hover": {
                    "& svg": {
                      color: grey[600],
                    },
                  },
                }}
                disableRipple
                onClick={onClickLanguages}
              >
                <Icon prefix="fal" name="globe" size={20} color="#ffffff" />
              </IconButton>
              <Languages open={languagesOpen} setOpen={setLanguagesOpen} />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}

function Languages({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const languagesRef = useRef<any>(null);
  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);
  const onClickOutside = (event: Event) => {
    if (!languagesRef.current.contains(event.target)) {
      setOpen(false);
    }
  };
  return (
    <Box
      ref={languagesRef}
      sx={{
        position: "absolute",
        top: 48,
        right: 0,
        display: open ? "flex" : "none",
        boxShadow: `rgb(0 0 0 / 10%) 0px 2px 10px`,
        backgroundColor: "#ffffff",
        borderRadius: 1,
        border: `1px solid ${grey[300]}`,
        flexDirection: "column",
        p: theme.spacing(1, 0),
      }}
      className="languages"
    >
      {languages.map((item, index) => {
        const { title } = item;
        const onClick = () => {
          setOpen(false);
        };
        return (
          <ButtonBase
            key={index}
            sx={{
              width: "100%",
              p: theme.spacing(1, 2),
              "&:hover .ripple": {
                opacity: 1,
              },
              "&:hover *": {
                fontWeight: "700",
                color: "#2F59CC",
              },
            }}
            onClick={onClick}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: alpha("#2F59CC", 0.08),
                transition: `all 0.35s ease`,
                opacity: 0,
                zIndex: 0,
              }}
              className="ripple"
            />
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                color: grey[900],
              }}
            >
              {title}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
