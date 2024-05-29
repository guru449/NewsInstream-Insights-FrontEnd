import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Container,
  Button,
  Link
} from '@mui/material';

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/articles?page=${page}&size=8`);
      setArticles(res.data);
      setHasMore(res.data.length === 8);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMoreArticles = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    try {
      const res = await axios.get(`http://localhost:8082/articles?page=${nextPage}&size=8`);
      setArticles([...articles, ...res.data]);
      setHasMore(res.data.length === 8);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        paddingTop: '64px',
        paddingBottom: '16px',
        position: 'relative'
      }}
    >
      <AppBar position="fixed" sx={{ backgroundColor: '#1976d2' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              NewsHub
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={3} justifyContent="flex-start">
          {articles.map((article, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {article.urlToImage && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={article.urlToImage || 'https://via.placeholder.com/150'}
                    alt={article.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Source:</strong> {article.source}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>By:</strong> {article.author || 'Unknown'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {article.description}
                  </Typography>
                  <Link href={article.url} target="_blank" rel="noopener" variant="body2">
                    View Full News
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {hasMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={loadMoreArticles}
              sx={{
                padding: '10px 20px',
                borderRadius: '30px',
                minWidth: '200px',
                width: 'auto',
                textAlign: 'center',
                display: 'inline-block'
              }}
            >
              Show More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NewsList;
