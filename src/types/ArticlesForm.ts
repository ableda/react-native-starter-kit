export interface ArticlesFormProps {
  userInput: { email: string };
  onFormSubmit: any;
}

export interface ArticlesFormState {
  error: string | undefined;
  loading: boolean | undefined;
  success: string | undefined;
}
