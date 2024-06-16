import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray(props) {
    const {data, setKeywords} = props;
  const [chipData, setChipData] = useState([]);

  useEffect(() => {
    setChipData(data)
  }, [data])
  
  const handleDelete = (chipToDelete, chipIndex) => () => {
    setKeywords((oldArray) => oldArray.filter((keyword, keywordIndex) => keywordIndex !== chipIndex));
  };
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data, index) => {

        return (
          <ListItem key={index}>
            <Chip
              label={data}
              onDelete={handleDelete(data, index)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
