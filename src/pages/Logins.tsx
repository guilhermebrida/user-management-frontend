import { Box, Button, Container, Grid, LinearProgress, TextField, Typography } from "@mui/material";

export default function Login() {
  const backgroudImage = "https://wallpapercave.com/wp/wp3327108.jpg";

  return (
    <Box 
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(87deg, #11cdef 0%, #1171ef 100%)",
      }}
    >
      <Container disableGutters
        sx={{
          margin:0,
          height: "540px",
          width: "900px",
          display: "flex",
          flexDirection: "row", 
          borderRadius: 3,
          boxShadow: 4,
          overflow: "hidden",
          padding: 0,
        }}
      >
        <Box
          sx={{
            flex: 0.5,
            backgroundImage: `url(${backgroudImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding:0
          }}
        />
        <Box
          sx={{
            flex: 0.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems:"center",
            gap: 2,
            padding: 4,
            backgroundColor: "rgb(247, 250, 252)"
            
          }}
        >
            <Typography variant="h3" gutterBottom sx={{color:"#12325c"}}>Sign In</Typography>
            <TextField fullWidth placeholder="Email" variant="outlined" size="small" sx={{width:"350px"}} />
            <TextField fullWidth placeholder="Senha" type="password" variant="outlined" size="small" sx={{width:"350px"}} />
            <Button size="small" sx={{bgcolor: "#12325c", color:"#ffffff"}}>Sign in</Button>
        </Box>
        {/* <Box display="flex" flexDirection="column" gap={1} padding={0} justifyContent={"center"} alignItems={"center"}>
            <TextField fullWidth placeholder="Email"   variant="outlined" size="small"/>
            <TextField fullWidth placeholder="Senha" type="password" size="small" />
            <Button size="small" sx={{bgcolor: "rgb(26, 115, 232)", color:"#ffffff"}}>Sign in</Button>
        </Box> */}
      </Container>
    </Box>
  );
}
