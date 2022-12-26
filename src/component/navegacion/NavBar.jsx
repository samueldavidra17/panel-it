import { useState } from 'react';
import { Box, Drawer, AppBar, CssBaseline, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import MenuList from './MenuList';
//componente navbar con la navegacion del panel
//https://mui.com/material-ui/react-app-bar/ --> doc de los componentes app bar
export default function NavBar({ children }) {
    const drawerWidth = 210;
    const [mobileOpen, setMobileOpen] = useState(false); // -->estado para abrir y cerrar el menu en dispositivos mobiles

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    return (
        <Box sx={{ display: 'flex' }} onContextMenu={(e) =>   e.preventDefault()}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Panel IT
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* se muestra en dispositivos mobiles */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, 
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    width: drawerWidth,
                    flexShrink: 0,
                    ['& .MuiDrawer-paper']: { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    {/* renderizado del componente menu con las opciones de navegacion */}
                    <MenuList />
                </Box>
            </Drawer>
            {/* se muestra en computadoras */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    {/* renderizado del componente menu con las opciones de navegacion */}
                    <MenuList />
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, /*backgroundColor: "#c2bfb6" */}}>
                <Toolbar />
                {/*paginas renderizadas dentro del navbar*/}
                {children}
            </Box>
        </Box>
    );
}
