import React from 'react'
import classes from './CSS/footer.module.css'
import imgFooter from './assets/images/10002.png'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <section className={classes.footer_wraper}>
      <div className={classes.footer_container}>
      <div className={classes.social_media}>
        <div>
            <img src={imgFooter} alt="" />
        </div>
        <ul>
            <li><FacebookOutlinedIcon style={{fontSize:"40"}}/></li>
            <li><InstagramIcon style={{fontSize:"40"}}/></li>
            <li><YouTubeIcon style={{fontSize:"40"}}/></li>
        </ul>
      </div>
      <div className={classes.middle_footer}>
        <h2>
            Usefull links
        </h2>
        <div>
            <ul>
                <li>Terms of service</li>
                <li>privacy policy</li>
            </ul>
        </div>
      </div>
      <div className={classes.end_footer}>
      <h2>
            Contact Info
        </h2>
        <div>
            <ul>
                <li><a href="">support@evangadi.com</a></li>
                <li>+1-202-386-2702</li>
            </ul>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Footer
