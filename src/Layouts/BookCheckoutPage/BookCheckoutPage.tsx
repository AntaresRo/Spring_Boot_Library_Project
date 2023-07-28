import {useEffect, useState} from "react";
import BookModel from "../../Models/BookModel";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [httError, setHttpError] = useState(null);

    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchBook = async () => {
            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;

            const url: string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;

            const loadedBooks: BookModel[] =[];
            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                });
            }
            setBook(loadedBooks);
            setIsLoading(false);


        };
        fetchBook().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        })
    }, []);




    return(
        <div>
            <h3>Hi World</h3>
        </div>
    );
}