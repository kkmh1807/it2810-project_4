export enum QueryMode {
  ALL = 'ALL',
  TITLE = 'TITLE',
  GENRE = 'GENRE',
  ACTOR = 'ACTOR'
}

export const QueryModeValues: Record<QueryMode, string> = {
  ALL: 'All',
  TITLE: 'Title',
  GENRE: 'Genres',
  ACTOR: 'Actor'
};
