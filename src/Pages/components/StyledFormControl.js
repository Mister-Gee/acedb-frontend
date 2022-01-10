import { withStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';



const StyledFormControl = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#16BC5D',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#16BC5D',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#333333',
        },
        '&:hover fieldset': {
          borderColor: '#16BC5D',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#16BC5D',
        },
      },
    },
  })(FormControl);

  export default StyledFormControl;