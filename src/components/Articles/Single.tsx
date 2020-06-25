import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, H3, Text } from 'native-base';
import { Loading, Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';
import { ArticlesSingleProps, ArticlesSingleState } from '../../types/ArticlesSingle';

class ArticlesSingleContainer extends Component<ArticlesSingleProps, ArticlesSingleState> {
  // static propTypes = {
  //   fetchData: PropTypes.func.isRequired,
  //   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // };

  // static defaultProps = {
  //   id: null,
  // };

  constructor(props) {
    super(props);
    this.state = { loading: false, error: undefined, article: undefined };
  }

  componentDidMount = () => this.fetchData();

  /**
   * Fetch Data
   */
  fetchData = async () => {
    const { fetchData, id } = this.props;

    this.setState({ loading: true, error: undefined });

    try {
      const article = await fetchData(id);
      this.setState({ loading: false, error: undefined, article });
    } catch (err) {
      this.setState({ loading: false, error: err.message, article: undefined });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { loading, error, article } = this.state;

    if (error) {
      return <Error content={error} tryAgain={this.fetchData} />;
    }

    if (loading || !article) {
      return <Loading />;
    }

    if (Object.keys(article).length < 1) {
      return <Error content={errorMessages.articles404} />;
    }

    return (
      <Container>
        <Content padder>
          {!!article.image && (
            <Image
              source={{ uri: article.image }}
              style={{
                height: 200,
                width: undefined,
                flex: 1,
                resizeMode: 'contain',
              }}
            />
          )}

          <Spacer size={25} />
          <H3>{article.name}</H3>
          <Spacer size={15} />

          {!!article.content && (
            <Card>
              <CardItem header bordered>
                <Text>Content</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{article.content}</Text>
                </Body>
              </CardItem>
            </Card>
          )}
          <Spacer size={20} />
        </Content>
      </Container>
    );
  };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.articles.fetchSingle,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesSingleContainer);
