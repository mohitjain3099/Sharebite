import { useState } from 'react';
import { translate } from './Translate';
import { DialogProps } from '../../interfaces/DialogProps';
import { Box, Button, Container, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { cols } from './LoadJson';
import CloseIcon from '@mui/icons-material/Close';
import '../../dist/language.css';

export default function LanguageSelectorDialogComponent({ open, handleClose }: DialogProps) {

    // const [open, setOpen] = useState(false);
    const handleLanguageSelect = async (languageCode: string) => {
        handleClose();
        await translate(languageCode);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.7)', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', overflow: 'auto' } }}>
                <Container className='pd-tb-20'>
                    <DialogTitle>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography sx={{ color: 'white', fontWeight: 'bolder' }} variant="h3">Select Language</Typography>
                            <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                    position: 'absolute',
                                    color: 'white',
                                    right: 7,
                                    top: 10,
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>

                    <DialogContent sx={{ overflowY: 'auto', marginRight: '-16px' }}>
                        <Box sx={{ display: 'flex' }}>
                            {cols.map((column, index) => (
                                <List key={index} style={{ flex: 1 }}>
                                    {column.map((language: { native_name: string; language_code: React.Key | null | undefined; display_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, languageIndex: number) => (
                                        <Button key={languageIndex} onClick={() => {
                                            if (typeof language.language_code === 'string') {
                                                handleLanguageSelect(language.language_code);
                                            }
                                        }}>
                                            <ListItem button key={language.language_code}>
                                                <ListItemText primary={language.display_name + '(' + language.native_name + ')'} />
                                            </ListItem>
                                        </Button>
                                    ))}
                                </List>
                            ))}
                        </Box>
                    </DialogContent>
                </Container>
            </Dialog>
        </div>
    )
}