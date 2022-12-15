import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import "./Navbar.css";
import useLocalStorage from 'react-use-localstorage';
import SearchIcon from '@material-ui/icons/Search';
import SDrawer from '../drawer/Drawer';
import { InputBase, Typography } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';
import useLocalStorage from 'react-use-localstorage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      backgroundColor: '#FEFAE0',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    logo: {
      width: '150px',
      marginTop: '5px',
    },
    searching: {
      marginRight: theme.spacing(2),
      color: '#BC6C25',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    searchIcon: {
      //padding: theme.spacing(0, 2),
      height: '52%',
      position: 'absolute',
      color: '#BC6C25',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

export default function Navbar() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  let navigate = useNavigate();

  const dispatch = useDispatch();
  const token = useSelector<TokenState, TokenState['tokens']>(
    (state) => state.tokens
  )

  
  const [email, setEmail] = useLocalStorage('email');
  
  function goLogout(){
    dispatch(addToken(''))
    setEmail('')
    toast.info('Usuário deslogado', {
      position: 'top-right', // position? topo direita
      autoClose: 2000, // Fechar automaticamente? após 2 segundos
      hideProgressBar: false, // não mostrar o progresso? mostrar
      closeOnClick: true, // fechar após o click? sim
      pauseOnHover: false, // pausar quando o usuário mover o mouse? não
      draggable: false, // permitir mover a notificação do local? não
      theme: 'light', // tema? light
      progress: undefined // 
    });
    navigate('/login');
  }

  let navbarComponents;
  
  if(token != ''){
    navbarComponents = <div className={classes.grow}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Comunidade organica
        </Typography>

        <IconButton>
          <Link to="/home" className='text-decorator-none'>
            <p> Home </p>
          </Link>
        </IconButton>

        <IconButton>
          <Link to="/produtos" className='text-decorator-none'>
            <p> Produtos </p>
          </Link>
        </IconButton>
        
        <IconButton>
          <Link to="/formularioproduto" className='text-decorator-none'>
            <p> Cadastrar produto </p>
          </Link>
        </IconButton>

        <IconButton>
          <Link to="/categorias" className='text-decorator-none'>
            <p> Categorias </p>
          </Link>
        </IconButton>
        
        <IconButton>
          <Link to="/formulariocategoria" className='text-decorator-none'>
            <p> Cadastrar categoria </p>
          </Link>
        </IconButton>

        <IconButton>
          <Link to="/sobre" className='text-decorator-none'>
            <p> Sobre </p>
          </Link>
        </IconButton>
        
        <IconButton onClick={goLogout}>
          <p> Logout </p>
        </IconButton>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
    {renderMenu}
  </div>
  }

  return (
    <>
      <AppBar className={classes.grow} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography>
            <img src='https://media.discordapp.net/attachments/1025004926046322759/1052920045413605466/20221214_211344_0000.png'
            className={classes.logo}/>
          </Typography>
          <div className={classes.searching}>
              <SearchIcon className={classes.searchIcon} />
              <InputBase
                placeholder="Busca..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
          </div>
          <SDrawer />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
