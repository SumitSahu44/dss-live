import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Agar URL me #hash NAHI hai, tabhi top pe jao.
    // Agar hash hai, to App.jsx ka logic sambhal lega.
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}