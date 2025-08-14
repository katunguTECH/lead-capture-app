import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    if (document.getElementById("tawk-script")) return; // prevent duplicates

    const s1 = document.createElement("script");
    s1.id = "tawk-script";
    s1.async = true;
    s1.src = "https://embed.tawk.to/689db051fffd7419290ac758/1j2jvhfpj";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    const s0 = document.getElementsByTagName("script")[0];
    s0.parentNode.insertBefore(s1, s0);

    return () => {
      s1.parentNode && s1.parentNode.removeChild(s1);
    };
  }, []);

  return null; // no visible React element needed
}
