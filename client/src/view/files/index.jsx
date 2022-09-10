import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { CreateNewFolderOutlined } from '@mui/icons-material';

import { _files, rows, headCells } from './dummy';
import RoomLayout from '../../layout/RoomLayout';
import ActionHandler from '../../components/files/ActionHandler';
import { StyledContainer } from '../../components/global/StyledContainer';

const Files = () => {
  return (
    <RoomLayout>
      <StyledContainer width='lg'>
        {/* actions */}
        <Box mb={3} display='flex'>
          <Button
            startIcon={<CreateNewFolderOutlined />}
            // onClick={() =>}
            sx={{
              textTransform: 'capitalize',
              color: '#000',
              fontSize: '1rem',

              '&:hover': {
                bgcolor: '#00000020',
              },
            }}
          >
            Create Folder
          </Button>
          <ActionHandler />
        </Box>

        {/* content */}
        <Paper
          elevation={2}
          sx={{ p: 3, border: '1px solid rgba(0, 0, 0, 0.1)' }}
        >
          {/* breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            aria-label='breadcrumb'
            maxItems={7}
            itemsAfterCollapse={2}
            itemsBeforeCollapse={1}
            sx={{ mb: 3 }}
          >
            {_files}
          </Breadcrumbs>

          {/* list of files here */}
          <Divider sx={{ mt: 2 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox'>
                    <IconButton disabled>
                      <InsertDriveFileOutlinedIcon
                        fontSize='small'
                        sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                      />
                    </IconButton>
                  </TableCell>

                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align='left'
                      padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                      <TableSortLabel
                      // active={orderBy === headCell.id}
                      // direction={orderBy === headCell.id ? order : 'asc'}
                      // onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              {/* body */}
              <TableBody>
                {rows.map((row) => (
                  <TableRow hover key={row.filname}>
                    <TableCell padding='checkbox'>
                      <IconButton disabled>
                        {row.isFolder ? (
                          <FolderIcon
                            fontSize='small'
                            sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                          />
                        ) : (
                          <InsertDriveFileIcon
                            fontSize='small'
                            sx={{ color: 'rgba(0, 0, 0, 0.87)' }}
                          />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell align='left' padding='none'>
                      {row.filname}
                    </TableCell>
                    <TableCell align='left'>{row.dateModified}</TableCell>
                    <TableCell align='left'>{row.modifiedBy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </StyledContainer>
    </RoomLayout>
  );
};
export default Files;
