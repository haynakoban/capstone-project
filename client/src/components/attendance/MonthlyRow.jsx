// edit this part later

// import {
//   Box,
//   Collapse,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Typography,
// } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// import { Fragment, useState } from 'react';

// const MonthlyRow = (props) => {
//   const { row } = props;
//   const [open, setOpen] = useState(false);

//   return (
//     <Fragment>
//       <TableRow>
//         <TableCell>
//           <IconButton
//             aria-label='expand row'
//             size='small'
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component='th' scope='row'>
//           {row.name}
//         </TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout='auto' unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant='h6' gutterBottom component='div'>
//                 January
//               </Typography>
//               <Table size='small' aria-label='purchases'>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Day</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell />
//                     <TableCell />
//                     <TableCell />
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.map((month) => (
//                     <TableRow key={month.day}>
//                       <TableCell>{month.day}</TableCell>
//                       <TableCell>{month.status}</TableCell>
//                       <TableCell />
//                       <TableCell />
//                       <TableCell />
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </Fragment>
//   );
// };
// export default MonthlyRow;
