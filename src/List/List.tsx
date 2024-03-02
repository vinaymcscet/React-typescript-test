import React, {useState, useEffect, useRef} from 'react';
import { Link, useParams } from "react-router-dom";
import Photo from '../Deriatives/Interface/Interface';
import { useFavorites } from '../Deriatives/Hooks/useFavorites';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './List.css';


const List: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const listRef = useRef<HTMLUListElement>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const { addToFavorites } = useFavorites();
    const fetchPhotos = async (page:number) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`);
        setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
        if (id && listRef.current) {
            const listItem = listRef.current.querySelector(`li[data-id="${id}"]`);
            if (listItem) {
                listItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        if (response.data.length === 0) {
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchPhotos(page);
    }, [page]);

    const loadMorePhotos = () => {
        setPage(prevPage => prevPage + 1);
    };
    
    const handleAddToFavorites = (photo: Photo) => {
        addToFavorites(photo);
        // localStorage.setItem('favorites', JSON.stringify(photo));
    }
    return (
        <div className="listPageWrapper">
            <h1>List Page</h1>
            <Link to="/dashboard" >Back to Dashboard</Link>
            <InfiniteScroll
                dataLength={photos.length}
                next = {loadMorePhotos}
                hasMore = {hasMore}
                loader={<h4>Loading ... </h4>}

            >
                <ul ref={listRef}>
                    { photos.map(photo => (
                        <li key={photo.id}>
                            <img src={photo.url} alt={photo.title} />
                            <p>ID: {photo.id}</p>
                            <p>Title: {photo.title}</p>
                            <button type="button" onClick={() => handleAddToFavorites(photo)}>Add to Favourites</button>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    )
}

export default List;