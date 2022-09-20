import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProTip from "../src/components/ProTip";
import Copyright from "../src/components/Copyright";
import Link from "next/link";

export default function About() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/" passHref>
          <Button variant="contained">Go to the main page</Button>
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
