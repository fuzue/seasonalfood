
import { DialogTitle, DialogContent, DialogContentText, Link, Typography, Stack, Box }
  from "@mui/material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GitHubIcon from '@mui/icons-material/GitHub';

//dialog box that opens with each element clicked
export default function ContactDialog() {
  return (
    <>
      <DialogTitle id="contact-dialog-title">
        {"Contact"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="contact-dialog-description" >
          Contact us via email, visit 
            <Link underline="hover" color="inherit" href="https://seasonalfood.fuzue.tech/" target="_blank"> our website</Link> 
            &nbsp;or check out <Link underline="hover" color="inherit" href="https://github.com/fuzue/seasonalfood"> our repository in github.</Link>
          <Box sx={{display: 'flex', justifyContent: 'start', mt:2, }}>
            <AlternateEmailIcon sx={{mr:1}} />
            <Link underline="hover" color="inherit" href="mailto:contact@fuzue.tech">contact@fuzue.tech</Link>
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'start', mt:1}}>
            <GitHubIcon sx={{mr:1}}/>
            <Link underline="hover" color="inherit" href="https://github.com/fuzue/seasonalfood">GitHub Repo</Link>
          </Box>
        </DialogContentText>
      </DialogContent>
    </>


  )
}
