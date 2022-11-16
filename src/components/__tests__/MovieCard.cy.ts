import type { Movie } from '@/types/movie';
import MovieCard from '../MovieCard.vue';

describe('MovieCard.cy.ts', () => {
  it('opens and closes when clicked', () => {
    const mockedMovie: Movie = {
      _id: 'mockMovie',
      Series_Title: 'White Chicks',
      Poster_Link: '',
      Released_Year: 2004,
      Genre: 'Comedy',
      IMDB_Rating: 5.7,
      Overview: 'Two disgraced FBI agents go way undercover in an effort to protect hotel heiresses the Wilson sisters from a kidnapping plot.',
      Star1: 'Marlon Wayans',
      Star2: 'Shawn Wayans',
      Star3: 'Busy Phillipps',
      Star4: 'Maitland Ward',
      Watched: false
    };
    cy.mount(MovieCard, { props: { movie: mockedMovie } });

    cy.get('.movie-card-details').should('not.be.visible');
    cy.get('.movie-card').click();
    cy.get('.movie-card-details').should('be.visible');
  });
});
