import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const HomePage = () => {

  return (
    <Layout pageContent={<HomeContent />} />
  );
};

export default HomePage;

const HomeContent = () => {

  const navigate = useNavigate();

  const features = [
    {
      title: "Testimonials",
      route: "/testimonials",
      image: "https://cdn-icons-png.flaticon.com/512/3237/3237472.png",
    },
    {
      title: "Gallery",
      route: "/gallery",
      image: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
    },
    {
      title: "Newsletter",
      route: "/newsletter",
      image: "https://cdn-icons-png.flaticon.com/512/2099/2099190.png",
    },
    {
      title: "Blogs",
      route: "/blogs",
      image: "https://cdn-icons-png.flaticon.com/512/2620/2620986.png",
    },
    {
      title: "Founder",
      route: "/founder",
      image: "https://cdn-icons-png.flaticon.com/512/2620/2620986.png",
    },
  ];

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        {features.map(({ title, route, image }) => (
          <Card
            key={title}
            sx={{
              flex: '1 1 calc(50% - 32px)',
              maxWidth: 400,
              height: 240,
              borderRadius: 3,
              boxShadow: 3,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-6px)',
              },
              '@media (max-width: 600px)': {
                flex: '1 1 100%',
              },
            }}
          >
            <CardActionArea onClick={() => navigate(route)} sx={{ height: '100%' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <img
                  src={image}
                  alt={title}
                  style={{ width: 64, height: 64, marginBottom: 16 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  )
}
