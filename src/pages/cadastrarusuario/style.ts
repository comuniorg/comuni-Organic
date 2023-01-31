import { makeStyles } from "@material-ui/core";
import tomate from '../../assets/images/tomate.jpg';



const styles = makeStyles({
	box: {
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
	},

	boxBotao: {
		display: 'flex-start',
		justifyContent: 'center'
	},

	Gridpai1: {
		backgroundImage: `url(${tomate})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		display:'flex'
	},

	imagemlogo: {
		width: '90px'
			
	},

	form: {
		display: 'block',
		border: '1px solid rgba(96,108,56,0.7)',
		borderRadius: 40,
		backgroundColor: 'rgba(96, 108, 56, 0.7)',
		padding: '2rem',
		margin: '40px 32px',
	},

	cadastro:{
		background: 'flex'
	}
});

export { styles };

