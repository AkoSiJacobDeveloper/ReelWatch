import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "./firebase";

type Movie = {
    title: string;
    imageUrl: string;
    description: string;
};

export const addMovieToWatchlist = async (movie: Movie) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged in");

    const userWatchlistRef = collection(db, "users", user.uid, "watchlist");
    await addDoc(userWatchlistRef, movie);
};
