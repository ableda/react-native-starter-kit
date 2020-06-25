import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';
import Form from './Form';

interface ArticlesFormProps {
    userInput: { email: string},
    onFormSubmit: any,
}

interface ArticlesFormState {
    error: string | undefined;
    loading: boolean | undefined;
    success: string | undefined;
}

class ArticlesFormContainer extends Component<ArticlesFormProps, ArticlesFormState> {
  static propTypes = {
    userInput: PropTypes.shape({}).isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  constructor(props: ArticlesFormProps) {
    super(props);
    this.state = { error: undefined, success: undefined, loading: false };
  }

  /**
   * On Form Submission
   */
  onFormSubmit = async (data) => {
    const { onFormSubmit } = this.props;

    this.setState({ success: undefined, error: undefined, loading: true });

    try {
      const success = await onFormSubmit(data);
      this.setState({ success, error: undefined, loading: false });
    } catch (error) {
      this.setState({ loading: false, success: undefined, error: error.message });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { userInput } = this.props;
    const { error, loading, success } = this.state;

    return (
      <Container>
        <Content padder>
          <Form
            error={error}
            loading={loading}
            success={success}
            defaultValues={userInput}
            onFormSubmit={this.onFormSubmit}
          />

        </Content>
      </Container>
    );
  };
}

const mapStateToProps = (state) => ({
  userInput: state.articles.userInput || {},
});

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit: dispatch.articles.save,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesFormContainer);
