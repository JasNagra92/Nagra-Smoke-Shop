import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const MyAccount = () => {
    const { user } = useAuthContext()

    useEffect(() => {
        
    }, [])

    return(
        <div>

        </div>
    )
}
export default MyAccount