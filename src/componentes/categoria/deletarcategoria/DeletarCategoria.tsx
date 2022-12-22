import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import './DeletarCategoria.css';
import { useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Categoria from '../../../models/Categoria';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function DeletarCategoria() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    const [categoria, setCategoria] = useState<Categoria>()

    useEffect(() => {
        if (token == "") {
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
        <>
            <Box m={2} >
                <Card variant="outlined" >
                    <CardContent >
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar o Categoria:
                            </Typography>
                            <Typography color="textSecondary">
                                Nome: {categoria?.categoria}
                            </Typography>
                            <Typography color="textSecondary">
                                Localidade: {categoria?.localidade}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <button className="aacta" onClick={sim}>
                                <span>sim</span>
                                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </button>
                            </Box>
                            <Box mx={2}>
                                <button  className="acta" onClick={nao}>
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
        </>
    );
}
export default DeletarCategoria;