import { DialogTitle, DialogContent, DialogContentText, Link }
  from "@mui/material";

//dialog box that opens with each element clicked
export default function ContributeDialog() {
  return (
    <>
      <DialogTitle id="contribute-dialog-title" color="dark-gray" >
        {"Contribute"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="contribute-dialog-description">
          This is an open source project, that means you can clone this repository, write issues, make your own changes and submit your own pull requests.           
          <p>For this, use our&nbsp; 
          <Link underline="hover" href="https://github.com/fuzue/seasonfood" target="_blank">
            github Page.
            
          </Link></p>
        </DialogContentText>
      </DialogContent>
    </>


  )
}
