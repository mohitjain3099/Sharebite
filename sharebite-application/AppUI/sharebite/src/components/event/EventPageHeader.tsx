import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import NewEventComponent from './NewEventComponent'; 
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user-slice';
import { User } from '../../models/User';
// Styles for Search
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    border: '1px solid #FD514E',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '300px',
    },
  }));
  // Search Icon styles
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    //pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD514E',
    borderBottomLeftRadius: '20px',
    borderTopLeftRadius: '20px',
    color: 'white',
    zIndex: 1
    //paddingRight: '11px'
  }));
  // Input styles
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: '#FD514E',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(2em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
// EventPageHeaderProps
type EventPageHeaderProps = {
    setSearchKeyword: (searchKeyWord: string) => void;
};
// EventPageHeader
function EventPageHeader( {setSearchKeyword}: EventPageHeaderProps) {
    // Get user from store
    const user: User | null = useSelector(selectUser());
    // State for open dialog
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    // Handle open dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    // Handle close dialog
    const handleClose = () => {
        setOpen(false);
    };
    // Handle search change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    // Handle key down
    const handleKeyDown = (event: React.KeyboardEvent) => {
        console.log('Key Down:');
        if (event.key === 'Enter') {
            setSearchKeyword(searchText);
        }
    };
    // Handle search
    const handleSearch = () => {
        setSearchKeyword(searchText);
    }
    return (
        <>
            <Box sx={{ p: 2, display:'flex', flexDirection:'row', margin:'90px 0px 30px 30px'}}>
                <Search>
                        <SearchIconWrapper onClick={handleSearch}>
                        <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                        />
                </Search>
                {(user?.role==='admin' || user?.role==='ngo') &&                 
                <Button sx={{
                    backgroundColor:'black',
                    marginLeft: '10px',
                    borderRadius: '20px',
                    '&:hover': {
                        backgroundColor: '#FD514E',
                    }
                }} 
                variant="contained" onClick={handleClickOpen}>Create Event</Button>}

                <NewEventComponent open={open} handleClose={handleClose} />
            </Box>
        </>
    );
}

export default EventPageHeader;