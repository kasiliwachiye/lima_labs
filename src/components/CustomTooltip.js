import { createContext, useContext, useMemo, useState } from "react";

import useMousePosition from "./useMousePosition";

const TooltipContext = createContext();

//Function for all those little tooltip context consumers out there
export function useTooltipContext() {
  const tooltipContext = useContext(TooltipContext);
  return tooltipContext;
}

//Tooltip provider
export default function CustomTooltip({ children }) {
  const emptyTooltip = {
    open: false,
    content: null,
    style: null,
  };
  const [tooltip, setTooltip] = useState(emptyTooltip);

  const openTooltip = ({ content, style }) => {
    setTooltip({
      open: true,
      content: content,
      style: style,
    });
  };

  const closeTooltip = () => {
    setTooltip(emptyTooltip);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Tooltip tooltip={tooltip} />
      <TooltipProvider openTooltip={openTooltip} closeTooltip={closeTooltip}>
        {children}
      </TooltipProvider>
    </div>
  );
}

const Tooltip = ({ tooltip }) => {
  const position = useMousePosition();
  const left = tooltip.open ? position.x : -9999;
  const top = tooltip.open ? position.y : -9999;

  return (
    <div
      style={{
        position: "fixed",
        left: left + 5,
        top: top + 5,
        zIndex: 9999,
        ...tooltip.style,
      }}
    >
      {tooltip.content}
    </div>
  );
};

// Used in the CustomTooltip wrapper above
function TooltipProvider({ children, openTooltip, closeTooltip }) {
  const tooltipContext = useMemo(() => {
    return {
      openTooltip: openTooltip,
      closeTooltip: closeTooltip,
    };
  }, [openTooltip, closeTooltip]);

  return (
    <TooltipContext.Provider value={tooltipContext}>
      {children}
    </TooltipContext.Provider>
  );
}
