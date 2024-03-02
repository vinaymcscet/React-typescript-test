import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../Deriatives/Hooks/useFavorites";


const Dashboard: React.FC = () => {
    const { favorites } = useFavorites();
    return (
        <div className="listPageWrapper">
            <h1>Dashboard Page</h1>
            <Link to="/list" >Go to List Page</Link>
            <h2>Favorites</h2>
            <ul>
                { favorites.map((photo) => (
                    <li key={photo.id}>
                        <Link to={`/list/${photo.id}`}>{photo.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard;