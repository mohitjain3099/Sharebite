import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import NewPostComponent from './NewPostComponent';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user-slice';
import { User } from '../../models/User';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD514E',
    borderBottomLeftRadius: '20px',
    borderTopLeftRadius: '20px',
    color: 'white',
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
// PostPageHeaderProps
type PostPageHeaderProps = {
    setSearchKeyword: (searchKeyWord: string) => void;
};
// PostPageHeader
function PostPageHeader( {setSearchKeyword}: PostPageHeaderProps) {
    // State for the Dialog
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const user: User | null = useSelector(selectUser());
    const [selectedButton, setSelectedButton] = useState('All');
    // Open Dialog Function
    const handleClickOpen = () => {
        setOpen(true);
    };
    // Close Dialog Function
    const handleClose = () => {
        setOpen(false);
    };
    // Search Function
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };
    // Key Down Function
    const handleKeyDown = (event: React.KeyboardEvent) => {
        console.log('Key Down:');
        if (event.key === 'Enter') {
            console.log('Enter Key Pressed:'+searchText);
            setSearchKeyword(searchText); // Use the prop here
        }
    };
    // Filter Function
    const handleFilter = (buttonValue: string) => {
        setSearchKeyword(buttonValue);
    }
    return (
        <>
            <Box sx={{ 
                p: 2, 
                display:'flex', 
                flexDirection:'row',
                alignItems: 'center', // Align items vertically
                justifyContent:'space-between' ,
                margin:'90px 0px 30px 15px'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                        />
                    </Search>
                    <Select
                        value={selectedButton}
                        onChange={(event: { target: { value: any; }; }) => {
                            const value = event.target.value;
                            setSelectedButton(value);
                            if (value === 'FoodPost') {
                                handleFilter('FoodAvailabilityPost');
                            } else if (value === 'RawMaterialPost') {
                                handleFilter('RawMaterialPost');
                            } else if (value === 'NgoPost') {
                                handleFilter('NGOPromotionalPost');
                            } else if (value === 'All') {
                                handleFilter('');
                            }
                        }}
                        sx={{
                            backgroundColor:'white',
                            color: '#FD514E',
                            marginLeft: '10px',
                            borderRadius: '20px',
                            height: '40px',
                            width: '200px',
                            '&:hover': {
                                backgroundColor: '#FD514E',
                                color: 'white'
                            }
                        }}
                        renderValue={(selected) => {
                            if (selected === 'All') {
                                return 'Filter';
                            } else if (selected === 'FoodPost') {
                                return 'Food Availability Post';
                            } else if (selected === 'RawMaterialPost') {
                                return 'Raw Material Post';
                            } else if (selected === 'NgoPost') {
                                return 'NGO Post';
                            } else {
                                return selected;
                            }
                        }}
                    >
                        <MenuItem value={'FoodPost'}>Food Availability Post</MenuItem>
                        <MenuItem value={'RawMaterialPost'}>Raw Material Post</MenuItem>
                        <MenuItem value={'NgoPost'}>NGO Post</MenuItem>
                        <MenuItem value={'All'}>All Post</MenuItem>
                    </Select>
                </Box>
                {user?.role!=='delivery' && 
                <Button 
                    disabled={!user}
                    sx={{
                        backgroundColor:'black',
                        marginRight: '10px', // Add some space between the Select and Button
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#FD514E',
                        }
                    }} 
                    variant="contained" 
                    onClick={handleClickOpen}
                >
                    Add Post
                </Button>}
                <NewPostComponent open={open} handleClose={handleClose} />
            </Box>
        </>
    );
}

export default PostPageHeader;
