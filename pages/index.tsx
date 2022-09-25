import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

import AddContact from "../src/components/AddContact";
import Contacts from "../src/components/Contacts";
import Copyright from "../src/components/Copyright";
import Header from "../src/components/Header";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Index() {
  const { data: session } = useSession();

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Contacts />
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
