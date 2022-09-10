import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddIcon from '@mui/icons-material/Add';

const StyledTypography = styled((props) => {
  const { ...others } = props;
  return <Typography {...others} />;
})(({ theme }) => ({
  color: theme.palette.text.primary,
  whiteSpace: 'pre-wrap',
  fontWeight: 500,
  marginBottom: 24,
}));

const description = `Develop a static single page website using Tailwind CSS. Please use
creative skill to present your single page tailwind based web project.

Requirements:
    At least 1 page 
    Tailwind CSS only 
    Use jquery for javascript`;

const TaskCard = () => {
  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }} aria-label='recipe'>
            E
          </Avatar>
        }
        action={
          <Toolbar
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant='body2' fontWeight={700}>
              Due September 12, 2022 - 06:00 PM
            </Typography>
            <Typography variant='body2' fontWeight={700}>
              Closes September 13, 2022 - 06:00 PM
            </Typography>
          </Toolbar>
        }
        title='Elon Mush'
        subheader='about an hour ago'
      />
      <CardContent
        sx={{
          px: 3,
          py: 0,
          mb: 2,
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant='body2' fontWeight={700}>
          Due September 12, 2022 - 06:00 PM
        </Typography>
        <Typography variant='body2' fontWeight={700}>
          Closes September 13, 2022 - 06:00 PM
        </Typography>
      </CardContent>

      <CardContent
        sx={{
          px: 3,
          py: 0,
        }}
      >
        {/* title */}
        <Typography variant='body1' fontWeight={700} mb={2}>
          Task 4: Use API
        </Typography>

        {/* description */}
        <StyledTypography variant='body1' component='pre'>
          {description}
        </StyledTypography>

        {/* reference material - optional */}
        <Typography variant='body1' fontWeight={500} mb={0.5}>
          Reference Materials:
        </Typography>

        {/* list of reference files */}
        <Box px={2} mb={3}>
          <Box
            border='1px solid #3751FF'
            borderRadius={2}
            display='flex'
            alignItems='center'
            color='#3751FF'
            mb={0.5}
          >
            <IconButton disabled>
              <InsertDriveFileIcon sx={{ color: '#3751FF' }} />
            </IconButton>
            <Typography variant='body1' fontWeight={600}>
              Task 1: Vue Framework.docx
            </Typography>
          </Box>
          <Box
            border='1px solid #3751FF'
            borderRadius={2}
            display='flex'
            alignItems='center'
            color='#3751FF'
          >
            <IconButton disabled>
              <InsertDriveFileIcon sx={{ color: '#3751FF' }} />
            </IconButton>
            <Typography variant='body1' fontWeight={600}>
              Task 4: Use API
            </Typography>
          </Box>
        </Box>

        {/* my work */}
        <Typography variant='body1' fontWeight={500} mb={0.5}>
          My Work:
        </Typography>

        <Box px={2} mb={2}>
          <Box
            border='1px solid #3751FF'
            borderRadius={2}
            display='flex'
            alignItems='center'
            color='#3751FF'
            mb={0.5}
          >
            <IconButton disabled>
              <InsertDriveFileIcon sx={{ color: '#3751FF' }} />
            </IconButton>
            <Typography variant='body1' fontWeight={600}>
              Task 4: Use API
            </Typography>
          </Box>

          {/* add work */}
          <Button
            startIcon={<AddIcon />}
            sx={{ textTransform: 'capitalize', borderRadius: 2 }}
            onClick={() => console.log(`clicked the add work`)}
          >
            Add work
          </Button>
        </Box>

        <Box px={2}>
          <Button
            variant='outlined'
            sx={{ px: '23px' }}
            onClick={() => console.log(`clicked the submit`)}
          >
            Submit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
export default TaskCard;
