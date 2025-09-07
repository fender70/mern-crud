import { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import api from "../lib/axios.js"

import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"

const HomePage = () => {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get("http://localhost:5001/api/notes");
                console.log(response.data);
                setNotes(response.data);
                setIsRateLimited(false);
            } catch (error) {
                console.error("Error in fetchNotes", error);
                if(error.response.status === 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to fetch notes");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotes();
    },[])

    return (
        <div className="min-h-screen">
            <Navbar />    

            {isRateLimited && <RateLimitedUI />}

            <div className="max-w-7xl mx-auto p-4 mt-6">
                {isLoading && <div className="text-center text-primary py-10">Loading...</div>}

                {notes.length === 0 && !isRateLimited && !isLoading && <NotesNotFound />}

                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map(note => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage