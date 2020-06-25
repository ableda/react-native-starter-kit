import { Article } from "./Article";

export interface ArticlesSingleProps {
  fetchData: any;
  id: string;
}

export interface ArticlesSingleState {
  loading: boolean;
  error: string | undefined;
  article: Article | undefined;
}
