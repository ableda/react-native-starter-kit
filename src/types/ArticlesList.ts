import { List } from "./List";

export interface ArticlesListProps {
  listFlat: List[];
  listPaginated: Object;
  meta: {
    page: number;
    lastPage: number;
  };
  fetchData: any,
  pagination: [],
  page: string,
}

export interface ArticlesListState {
  error: string | undefined;
  loading: boolean;
  page: number;
}
