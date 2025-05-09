export interface FirstVisitHook {
  isFirstVisit: boolean;
  markAsVisited: () => void;
  resetVisitStatus: () => void;
}

export interface PopupProps {
  onClose?: () => void;
  showResetButton?: boolean;
}