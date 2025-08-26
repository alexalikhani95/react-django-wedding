import { Link } from "react-router"

export const Header = () => {
    return (
        <div className="bg-emerald-900 p-5 text-white">
            <div className="flex gap-4">
                <Link to="/signup">
                    Sign Up
                </Link>
                <Link to="/login">
                    Login
                </Link>
                <Link to="/rsvp">
                    RSVP
                </Link>
            </div>
        </div>
    )
}
