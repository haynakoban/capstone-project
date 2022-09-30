import { Typography } from '@mui/material';

const PostContent = ({ text }) => {
  return (
    <Typography
      variant='body1'
      component='pre'
      color='text.primary'
      mt={2}
      sx={{
        px: 1.75,
        py: 0.4,
        lineHeight: 1.6,
        hyphens: 'auto',
        overflowWrap: 'break-word',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      }}
    >
      {text}
    </Typography>
  );
};
export default PostContent;
