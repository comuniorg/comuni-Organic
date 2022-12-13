import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import './Rodape.css';
import './fontes/Raleway-Regular.ttf';

const styles = makeStyles({
    textos: {
        color: '#606c38',
        fontFamily: 'Raleway-Regular'
    }  
})

function Rodape() {
    const classes = styles();

    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid alignItems="center" item xs={12}>
                    <Box className='box1'>
                        <Box paddingTop={1} display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h5" align="center" gutterBottom className={classes.textos}>Acompanhe-nos nas Redes Sociais </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <a href="https://www.instagram.com/comuni.organica/" target="_blank">
                                <InstagramIcon className='redes' />
                            </a>
                            <a href="https://github.com/comuniorg/comuni-Organic/" target="_blank">
                                <GitHubIcon className='redes' />
                            </a>
                        </Box>
                    </Box>
                    <Box className='box2'>
                        <Box>
                            <a target="_blank" href="comuni.organacia@gmail.com">
                                <Typography variant="subtitle2" gutterBottom className='textos' align="center">comuni.organacia@gmail.com</Typography>
                            </a>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export { Rodape };