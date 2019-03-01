import React, { Component } from 'react';

import MovieIcon from './video.svg';
import SearchIcon from './search.svg';

import styles from './autocomplete.css';

class Autocomplete extends Component {
    constructor() {
        super();
        this.state = {
            value: 'Enter movie name',
            movies: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        if (event.target.value.length > 2) {
            this.getMovies();
        }
    }

    getMovies() {
        fetch("https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=" + this.state.value + "&page=1&include_adult=false")
        .then(results => {
            if (results.ok) {
                return results.json();
            } else {
                throw new Error("Something went wrong");
            }
        }).then(data => {
            let moviesData = data.results.slice(0, 8).map((movie) => {
                return (
                    <div className={styles.movie} onClick={this.makeActive.bind(this, movie.title)}>
                        <p>{movie.title}</p>
                        <p><span>{movie.vote_average} rating, {movie.release_date.slice(0, 4)}</span></p>
                    </div>
                )
            });
            this.setState({ movies: moviesData });
        })
    }

    makeActive(movieTitle) {
        this.setState({
            value: movieTitle,
            movies: [],
        });
    }

    render() {
        return (
            <div className={styles.search}>
                <form>
                    <div className={styles.movieIconWrapper}><MovieIcon className={styles.movieIcon} /></div>
                    <input value={this.state.value} onChange={this.handleChange} />
                    <button><SearchIcon className={styles.searchIcon} /></button>
                </form>
                <div className={styles.movies}>
                    {this.state.movies}
                </div>
            </div>
        );
    }
}

export default Autocomplete;
