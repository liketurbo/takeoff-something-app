import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useCallback } from "react";

export default function Header() {
  const session = useSession();

  const router = useRouter();

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push("/signin");
  }, [, router]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DEMO
            </Typography>
          </Link>
          {session.data && (
            <Button color="inherit" sx={{ ml: "auto" }} onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
