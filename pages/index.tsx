import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/components/ProTip";
import Copyright from "../src/components/Copyright";
import Link from "next/link";
import MuiLink from "@mui/material/Link";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" passHref>
          <MuiLink color="secondary">Go to the about page</MuiLink>
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
