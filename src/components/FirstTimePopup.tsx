import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, styled } from "@mui/material";


// Storage key for visited status
const VISITED_KEY = 'seasonalFoodHasVisited';

// Hook to handle first-time visit logic
export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(false);
  
  useEffect(() => {
    const hasVisited = localStorage.getItem(VISITED_KEY);
    if (!hasVisited) {
      setIsFirstVisit(true);
    }
  }, []);
  
  const markAsVisited = (): void => {
    localStorage.setItem(VISITED_KEY, 'true');
    setIsFirstVisit(false);
  };
  
  const resetVisitStatus = (): void => {
    localStorage.removeItem(VISITED_KEY);
    setIsFirstVisit(true);
  };
  
  return { isFirstVisit, markAsVisited, resetVisitStatus };
};

interface AdvancedFirstTimePopupProps {
  onClose?: () => void;
  showResetButton?: boolean;
}

const FirstTimePopup: React.FC<AdvancedFirstTimePopupProps> = ({ 
  onClose, 
}) => {
  const { isFirstVisit, markAsVisited } = useFirstVisit();
  const { t } = useTranslation();
  
  const handleClose = (): void => {
    markAsVisited();
    if (onClose) onClose();
  };

  const ShadowBox = styled(Stack)(({ theme }) => ({
    boxShadow: `0 2px 4px ${theme.palette.text.primary}`,
  }));

  if (!isFirstVisit) return null;
 
  return (
    <div style={{position:"fixed", left:'0', top:'0',    backgroundColor:"#00000082",  zIndex:"999",
      width: '100%',
      height: '100vh',
     }}>

      <ShadowBox
        position="fixed"
        top="37%"
        marginInline="3em"
        padding="1em"
        direction="column"
        alignItems="center"
        justifyContent="center"
        backgroundColor="#f9f3e3"
        maxWidth="500px"
        zIndex="1000"
        boxShadow="0 2px 4px #332323">
          <h3>{t('FirstTimePopup_welcome')}</h3>
          <p>{t('FirstTimePopup_text')}</p>
          <p>{t('FirstTimePopup_enjoy')}</p>
          <button className="popup-button" onClick={handleClose}>
            {t('SideBarDialog_close')}
          </button>
      </ShadowBox>
    </div>
  )
};

export default FirstTimePopup;