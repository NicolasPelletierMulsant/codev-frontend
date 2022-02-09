import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Cookies from 'universal-cookie';

const logout = () => {
    const cookies = new Cookies();
    cookies.remove('token');
}

const AvatarMenuOptions = [
    { text: "Profile", link: "/profile" },
    { text: "Se déconnecter", link: '/', onClick: logout },
];

export default function AvatarMenu(props) {
    const [anchorElAvatar, setAnchorElAvatar] = React.useState(null);

    const handleOpenAvatarMenu = (event) => { setAnchorElAvatar(event.currentTarget); };
    const handleCloseAvatarMenu = (event) => { setAnchorElAvatar(null); };

    return (
        <Box>
            <IconButton onClick={handleOpenAvatarMenu}>
                <Avatar src="/img/avatar_test.jpg" />
            </IconButton>
            <Menu anchorEl={anchorElAvatar} open={Boolean(anchorElAvatar)} onClose={handleCloseAvatarMenu}>
                {AvatarMenuOptions.map((option) => {
                    return (
                        <MenuItem key={option.text}>
                            <Typography textAlign="center">
                                <Link href={option.link} sx={{ textDecoration: "none" }} variant="inherit" onClick={option.onClick}>
                                    {option.text}
                                </Link>
                            </Typography>
                        </MenuItem>
                    );
                })}
            </Menu>
        </Box>
    );
}