"use client";
import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const trackVisitor = async () => {
      // Check if already tracked this session
      if (sessionStorage.getItem("tracked")) return;

      const getBrowser = () => {
        const ua = navigator.userAgent;
        if (ua.includes("Firefox")) return "Firefox";
        if (ua.includes("Chrome")) return "Chrome";
        if (ua.includes("Safari")) return "Safari";
        if (ua.includes("Edge")) return "Edge";
        if (ua.includes("Opera")) return "Opera";
        return "Unknown";
      };

      const getDevice = () => {
        const ua = navigator.userAgent;
        if (/Mobile|Android|iPhone|iPad/.test(ua)) return "Mobile";
        if (/Tablet|iPad/.test(ua)) return "Tablet";
        return "Desktop";
      };

      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            browser: getBrowser(),
            device: getDevice(),
            page: window.location.pathname
          })
        });
        sessionStorage.setItem("tracked", "true");
      } catch {
        // Ignore tracking errors
      }
    };

    trackVisitor();
  }, []);

  return null;
}
