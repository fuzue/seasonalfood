import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, styled, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';




// Storage key for visited status
const VISITED_KEY = 'seasonalFoodHasVisited';

// Hook to handle first-time visit logic
export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(() => {
    const hasVisited = localStorage.getItem(VISITED_KEY);
    return !hasVisited; // Return true if never visited
  });

  const markAsVisited = (): void => {
    localStorage.setItem(VISITED_KEY, 'true');
    setIsFirstVisit(false);
  };
  
  return { isFirstVisit, markAsVisited };
};

const FirstTimePopup: React.FC= () => {
  const { isFirstVisit, markAsVisited } = useFirstVisit();
  const { t } = useTranslation();
  
  const handleClose = (): void => {
    markAsVisited();
  };

  const ShadowBox = styled(Stack)(({ theme }) => ({
    boxShadow: `0 2px 4px ${theme.palette.text.primary}`,    
    backgroundColor: "#f9f3e3",
    fontFamily: 'inherit',
    borderRadius: '12px',
    border:'none'
  }));

  const CloseButton = styled(Stack)(({ theme })=>({
    backgroundColor: theme.palette.primary.main,
    color:'white',
    padding: '.75em 1.5em',
    borderRadius: '5px',
    cursor:'pointer'
  }))

  if (!isFirstVisit) return null;
 
  return (
    <div style={{
      position:"absolute", 
      left:'0', 
      top:'0',    
      backgroundColor:"#00000082",  
      zIndex:"999",
      width:"100vw",
      height:"100vh"
     }}>
      <div style={{
        height:'100vh',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>
      <ShadowBox
        display='flex'
        marginInline="1em"
        padding="1.5em"
        direction="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="500px"
        zIndex="1000"
        position="relative"
        >
          <Typography style={{display: 'flex', flexDirection:'column', alignItems: 'center', textAlign:'center'}}>
            <h2>🫑 {t('FirstTimePopup_welcome')} 🫐</h2>
            <p>{t('FirstTimePopup_text_1')}</p>
            <p>{t('FirstTimePopup_text_2')}</p>
            <h3>{t('FirstTimePopup_enjoy')} 😃</h3>
            <CloseButton  onClick={handleClose}>
              {t('SideBarDialog_close')}
            </CloseButton>
          </Typography>
          <div onClick={handleClose} style={{
            position: 'absolute', 
            right:'1em', 
            top:'1em', 
            opacity:'.5', 
            cursor:'pointer'
            }}>
            <CloseIcon></CloseIcon>
          </div>
        </ShadowBox>
      </div>
    </div>
  )
};

export default FirstTimePopup;