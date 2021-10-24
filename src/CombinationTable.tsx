import { TableContainer, TableBody, TableRow, TableCell, Paper, Table } from "@mui/material";

interface IProps {
  combinations: string[][]
}

export default function CombinationTable(props: IProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {
            props.combinations.map(teams => (
              <TableRow>
                {
                  teams.map(team => (
                    <TableCell>{team}</TableCell>
                  ))
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}