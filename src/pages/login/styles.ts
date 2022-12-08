import { makeStyles } from "@material-ui/core";

const styles = makeStyles({
    box: {
        display: 'flex',
        justifyContent: 'center'
    },
    boxBotao: {
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        display: 'block',
        padding: '1rem',
        border: '1px solid rgba(96,108,56,0.7)',
        borderRadius: 40,
        backgroundColor: 'rgba(96, 108, 56, 0.7)',
        margin: '3rem'
        
    },
    dInline: {
        display: 'inline'
    },
    imagemLogo: {
        width: '80px'
    }


});

export { styles };