

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', e=>{
        if (e.target.classList.contains('delete-button')){
            const movie= e.target.closest('.movie-card')
            const movieId= movie.getAttribute('data-id')
            fetch(`/movies/id/${movieId}`, {
                method: 'DELETE'
            })
            .then(res => {
                if (res.ok){
                    movie.remove();
                }else{
                    console.error('Dailed to delete book');
                }
            })
            .catch(error=>console.error('Failed to delete movie:', error));
            }
        });
    });