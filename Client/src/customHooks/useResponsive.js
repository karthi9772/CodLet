import { useEffect, useState } from "react"

function useResponsive(minHeight = 500) {
    const [minHeightReached, setMinHeightReached] = useState(window.innerHeight >= minHeight)

    useEffect(() => {
        const handleResize = () => {
            setMinHeightReached(window.innerHeight >= minHeight)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [minHeight])

    return { minHeightReached }
}

export default useResponsive
