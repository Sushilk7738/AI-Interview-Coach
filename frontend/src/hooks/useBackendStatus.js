import { useEffect, useState } from "react";

export default function useBackendStatus() {
const [ready, setReady] = useState(false);

useEffect(() => {
    // Localhost var direct ready
    if (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1") {
    setReady(true);
    return;
    }

    // Production var Render wake-up check
    fetch("https://ai-interview-coach-backend-lz1i.onrender.com/api/accounts/health/")
    .then((res) => res.json())
    .then((data) => {
        if (data.status === "ok") {
        setReady(true);
        }
    })
    .catch(() => {
        setTimeout(() => setReady(true), 3000);
    });
}, []);

return ready;
}