import { DialogTitle, DialogContent, DialogContentText, Link }
  from "@mui/material";

//dialog box that opens with each element clicked
export default function ContributeDialog() {
  return (
    <>
      <DialogTitle id="contribute-dialog-title"  >
        {"Contribute"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="contribute-dialog-description" color="dark-gray">
          This is an open source project, that means you can clone this repository, write issues, make your own changes and submit your own pull requests.
          <p>For this, use our&nbsp;
            <Link underline="hover" color="inherit" fontWeight={600} href="https://github.com/fuzue/seasonalfood" target="_blank">
              github page
            </Link>.
          </p>
        </DialogContentText>
      </DialogContent>
    </>


  )
}
