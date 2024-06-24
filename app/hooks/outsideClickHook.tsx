import React, { useRef, useEffect, ReactNode } from "react";

/**
 * Hook that detects clicks outside of the passed ref element.
 *
 * @param ref A React ref object for the element to monitor.
 * @param onOutsideClick A callback function to be invoked when a click occurs outside the element.
 */
function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  onOutsideClick: () => void
): void {
  useEffect(() => {
    /**
     * Handler for click events outside the element.
     *
     * @param event The click event object.
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    // Attach the event listener for mouse down events.
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove the event listener on component cleanup.
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]); // Ensure dependencies are up-to-date
}

/**
 * Component that renders its children and triggers the onOutsideClick callback
 * when a click occurs outside the component's boundaries.
 *
 * @param props Component properties.
 */
interface OutsideAlerterProps {
  children: ReactNode;
  onOutsideClick: () => void; // Callback function for outside click
}

const OutsideAlerter: React.FC<OutsideAlerterProps> = ({ children, onOutsideClick }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(wrapperRef, onOutsideClick); // Pass ref and callback to hook

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideAlerter;
