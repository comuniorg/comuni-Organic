import { makeStyles } from "@material-ui/core";
import CLegumes from '../../../assets/images/CLegumes.jpeg'
import variados from '../../../assets/images/legumesVerduraseFrutas.jpg'


const useStyles = makeStyles({
  
    Gridd:{
        backgroundImage: `url(${variados})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        display:'flex',
        
    },
    imagemlogo:{
        width: '90px',
        
    },
    form: {
        display: 'block',
        border: '1px solid rgba(96,108,56,0.7)',
        borderRadius: 40,
        backgroundColor: 'rgba(96, 108, 56, 0.930)',
        padding: '2rem',
        margin: '40px 32px',
    },
  })
  
  export {useStyles};