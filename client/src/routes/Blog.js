import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, CardHeader, CardActionArea, Link } from "@mui/material";

export default function Blog() {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 8 }}>
      <Card
        sx={{ width: 1000, display: "flex", flexDirection: "column" }}
        style={{ alignItems: "center" }}
      >
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Riga
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            Published: November 3<br />
            Author: Mantin
          </Typography>{" "}
        </CardContent>
<CardActionArea onClick={()=>alert('Under construction, I\'ll show more soon...')}>
        <CardContent sx={{ display: "flex", flexDirection: "row" }}>
          <Container sx={{ display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              alt="Riga"
              sx={{ width: 350, height: 350, marginLeft: 0 }}
              image="https://upload.wikimedia.org/wikipedia/commons/f/fb/Riga_-_Latvia.jpg"
            />
          </Container>

          <Typography variant="body2" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            mauris neque, fermentum sit amet mauris ultrices, vehicula
            condimentum odio. Mauris eu tincidunt dui, eu dictum elit. Sed orci
            nibh, malesuada a eleifend vitae, condimentum sit amet magna. Fusce
            varius tortor sit amet est sodales, mollis finibus libero volutpat.
            Phasellus libero urna, accumsan eget neque vitae, pellentesque
            volutpat turpis. Nullam id rhoncus nisl, in lobortis massa.
            Vestibulum ac semper odio. Vivamus convallis erat sed ex aliquam
            sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Vestibulum mauris neque, fermentum sit amet mauris ultrices,
            vehicula condimentum odio. Mauris eu tincidunt dui, eu dictum elit.
            Sed orci nibh, malesuada a eleifend vitae, condimentum sit amet
            magna. Fusce varius tortor sit amet est sodales, mollis finibus
            libero volutpat. Phasellus libero urna, accumsan eget neque vitae,
            pellentesque volutpat turpis. Nullam id rhoncus nisl, in lobortis
            massa. Vestibulum ac semper odio. Vivamus convallis erat sed ex
            aliquam sollicitudin. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Vestibulum mauris neque, fermentum sit amet mauris
            ultrices, vehicula condimentum odio. Mauris eu tincidunt dui, eu
            dictum elit. Sed orci nibh, malesuada a eleifend vitae, condimentum
            sit amet magna. Fusce varius tortor sit amet est sodales, mollis
            finibus libero volutpat. Phasellus libero urna, accumsan eget neque
            vitae, pellentesque volutpat turpis. Nullam id rhoncus nisl, in
            lobortis massa...{<Link underline="none">Read more</Link>}
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small">Gallery</Button>
          <Button size="small">Record</Button>
        </CardActions>
      </Card>
    </Container>
  );
}
