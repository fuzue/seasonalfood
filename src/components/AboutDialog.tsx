
import { DialogTitle, DialogContent, DialogContentText, Typography, Link }
  from "@mui/material"

//dialog box that opens with each element clicked
export default function AboutDialog() {
  return (
    <>
      <DialogTitle id="about-dialog-title">
        {"About the app"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="about-dialog-description" color="dark-gray">
          <p>
          This project was developed to address a genuine challenge:
          determining the availability of fruits and vegetables in a new
          country or region. Despite searching for solutions and information, I
          couldn't find anything intuitive or capable of meeting my needs.
          </p>

          <p>
          The concept behind this project was to create a simple and scalable
          solution, making it easy to modify and expand the database for
          different countries or regions. The primary objective of this app is
          to promote the consumption of locally grown produce, empower
          small-scale farmers, and ultimately reduce our contribution to global
          warming.
          </p>
          <Typography sx={{fontWeight: 600 }}>
            At the moment it is only available for Italian products.
          </Typography>
          <Typography sx={{fontWeight: 800, mt: 3}}>
            More about us in <Link underline="hover" sx={{ color: "inherit"}} href="https://fuzue.tech" target="_blank">fuzue.tech</Link> 
            <br /> More about the app <Link underline="hover" sx={{ color: "inherit"}} href="https://seasonalfood.fuzue.tech/" target="_blank" > here</Link> 
          </Typography>
        </DialogContentText>
      </DialogContent>
    </>


  )
}
