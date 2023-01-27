import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography, Grid, makeStyles } from '@material-ui/core';
import { Box } from '@mui/material';
import './DeletarCategoria.css';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Categoria from '../../../models/Categoria';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import useLocalStorage from 'react-use-localstorage';

const useStyles = makeStyles({
	div: {
		backgroundColor: '#C6E5B1',
		minHeight: '746px'
	},
	card: {
		backgroundColor: '#fefae0',
		borderRadius: '20px',
	}
})

function DeletarCategoria() {
	const classes = useStyles();

	let navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const token = useSelector<TokenState, TokenState["tokens"]>(
		(state) => state.tokens
	);
	const [categoria, setCategoria] = useState<Categoria>()

  const [email, setEmail] = useLocalStorage('email');

	useEffect(() => {
		if (token == "") {
      setEmail('')
			toast.error('Você precisa estar logado', {
				position: "bottom-left",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				theme: "colored",
				progress: undefined,
			});
			navigate("/login")

		}
	}, [token])

	useEffect(() => {
		if (id !== undefined) {
			findById(id)
		}
	}, [id])

	async function findById(id: string) {
		buscaId(`/categoria/${id}`, setCategoria, {
			headers: {
				Authorization: token
			}
		})
	}

	function sim() {
		navigate('/categorias');
		deleteId(`/categoria/${id}`, {
			headers: {
				Authorization: token
			}
		});
		toast.success('Categoria deletado com sucesso', {
			position: "bottom-left",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: false,
			theme: "colored",
			progress: undefined,
		});
	}

	function nao() {
		navigate('/categorias');
	}

	return (
		<div className={classes.div} style={{ minHeight: 'calc(100vh - 148px)' }}>
			<Grid container justifyContent='center'>
				<Grid item xs={12} sm={6} md={3}>
					<Box m={2}>
						<Card variant="outlined" className={classes.card}>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									Deseja deletar a categoria:
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Nome: {categoria?.categoria}
								</Typography>
								<Typography variant="h5" color="textSecondary">
									Localidade: {categoria?.localidade}
								</Typography>
							</CardContent>
							<CardActions>
								<Box display='flex' justifyContent='space-around' alignItems='center' style={{width: '100%'}} mb={1.5}>
									<Box mx={1}>
										<button className="aacta" onClick={sim}>
											<span>sim</span>
											<svg viewBox="0 0 13 10" height="10px" width="15px">
												<path d="M1,5 L11,5"></path>
												<polyline points="8 1 12 5 8 9"></polyline>
											</svg>
										</button>
									</Box>
									<Box mx={1}>
										<button className="acta" onClick={nao}>
											<span>não</span>
											<svg viewBox="0 0 13 10" height="10px" width="15px">
												<path d="M1,5 L11,5"></path>
												<polyline points="8 1 12 5 8 9"></polyline>
											</svg>
										</button>
									</Box>
								</Box>
							</CardActions>
						</Card>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
}
export default DeletarCategoria;