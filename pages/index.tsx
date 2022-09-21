import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Copyright from "../src/components/Copyright";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Header from "../src/components/Header";

export default function Index() {
  const { data: session } = useSession();

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" passHref>
            <MuiLink color="secondary">Go to the about page</MuiLink>
          </Link>
          <Typography>
            {session ? `Hello ${session.user?.name}` : "You are not signed in"}
          </Typography>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
