import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutlineOutlined';
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
            <Grid container direction="row" justifyContent="center">
                <Grid item xs={12} className='box1' alignItems='center'>
                    <Box display="flex" className='icons' justifyContent="space-between">
                        <a href="https://www.instagram.com/comuni.organica/" target="_blank">
                            <InstagramIcon className='redes' />
                        </a>
                        <a href="https://github.com/comuniorg/comuni-Organic/" target="_blank">
                            <GitHubIcon className='redes' />
                        </a>
                        <a target="_blank" href="mailto:comuni.organacia@gmail.com">
                            <MailOutlineIcon className='redes' />
                        </a>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export { Rodape };