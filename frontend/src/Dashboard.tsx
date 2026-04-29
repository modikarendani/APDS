import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const getUserData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/dashboard", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.status !== 200) {
                navigate('/login')
            }
        } catch (error) {
            navigate('/login')

        }
    }

    useEffect(() => {
        getUserData();
    }, []);
    return (
        <>
            <h1>DASHBOARD</h1>
        </>
    )
}