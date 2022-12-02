import { Grid } from "@material-ui/core";
import React from "react";
import github from '../../../assets/images/github.svg';
import discord from '../../../assets/images/discord.svg';
import "./Rodape.css";
import { classes } from './styles';

function Rodape(){
    return(
      <>
        <Grid className={classes.footer} container direction="row" justifyContent="space-evenly">
          <Grid item container xs={6} justifyContent="space-evenly">
            <Grid item>
              <a href="#">
                <img src={github} alt="Github"/>
              </a>
            </Grid>
            <Grid>
              <a href="#">
                <img src={discord} alt="Discord"/>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}

export { Rodape };