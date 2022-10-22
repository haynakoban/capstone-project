import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { Fragment, useState } from 'react';
import { DownloadableFile } from '../global';
import { DateFormatter } from '../../lib/DateFormatter';

const TasksRow = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component='th' scope='row'>
          {row?.name}
        </TableCell>
        <TableCell component='th' scope='row'>
          {row?.updatedAt && DateFormatter(row?.updatedAt)}
        </TableCell>
        <TableCell align='right'>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Files</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.filename?.map((file, index) => (
                    <TableRow key={file}>
                      <TableCell
                        component='th'
                        scope='row'
                        sx={{ cursor: 'pointer' }}
                      >
                        <DownloadableFile file={file} id={row?.id?.[index]} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
export default TasksRow;
