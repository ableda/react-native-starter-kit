import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import { Container, Card, CardItem, Body, Text, Button } from 'native-base';
import { Error, Spacer } from '../UI';
import { errorMessages } from '../../constants/messages';
import images from '../../styles/images';
import { ArticlesListProps, ArticlesListState } from '../../types/ArticlesList';

class ArticlesListContainer extends Component<ArticlesListProps, ArticlesListState> {
  // static propTypes = {
  //   listFlat: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  //   listPaginated: PropTypes.shape({}).isRequired,
  //   meta: PropTypes.shape({
  //     page: PropTypes.number,
  //   }).isRequired,
  //   fetchData: PropTypes.func.isRequired,
  //   pagination: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  //   page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // };

  // static defaultProps = {
  //   page: 1,
  // };

  constructor(props) {
    super(props);

    // Prioritize (web) page route over last meta value
    const page = props.page || props.meta.page;

    this.state = {
      error: undefined,
      loading: false,
      page: parseInt(page, 10) || 1,
    };
  }

  componentDidMount = () => this.fetchData();

  /**
   * If the page prop changes, update state
   */
  componentDidUpdate = (prevProps) => {
    const { page } = this.props;
    const { page: prevPage } = prevProps;

    if (page !== prevPage) {
      // eslint-disable-next-line
      this.setState(
        {
          error: undefined,
          loading: false,
          page: parseInt(page, 10) || 1,
        },
        this.fetchData,
      );
    }
  };

  /**
   * Fetch Data
   */
  fetchData = async ({ forceSync = false, incrementPage = false } = {}) => {
    const { fetchData } = this.props;

    let { page } = this.state;
    page = incrementPage ? page + 1 : page; // Force fetch the next page worth of data when requested
    page = forceSync ? 1 : page; // Start from scratch

    this.setState({ loading: true, error: undefined, page });

    try {
      await fetchData({ forceSync, page });
      this.setState({ loading: false, error: undefined });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  /**
   * Render
   */
  render = () => {
    const { listFlat, meta } = this.props;
    const { loading, error } = this.state;

    if (error) {
      return <Error content={error} tryAgain={this.fetchData} />;
    }

    if (listFlat.length < 1) {
      return <Error content={errorMessages.articlesEmpty} />;
    }

    return (
      <Container style={{ padding: 10 }}>
        <FlatList
          data={listFlat}
          onRefresh={() => this.fetchData({ forceSync: true })}
          refreshing={loading}
          renderItem={({ item }) => (
            <Card style={{ opacity: item.placeholder ? 0.3 : 1 }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  !item.placeholder ? Actions.articlesSingle({ id: item.id, title: item.name }) : null
                }
                style={{ flex: 1 }}
              >
                <CardItem cardBody>
                  {!!item.image && <Image source={{ uri: item.image }} style={images.articleImage} />}
                </CardItem>
                <CardItem cardBody>
                  <Body style={{ paddingHorizontal: 15 }}>
                    <Spacer size={10} />
                    <Text style={{ fontWeight: '800' }}>{item.name}</Text>
                    <Spacer size={15} />
                    {!!item.excerpt && <Text>{item.excerpt}</Text>}
                    <Spacer size={5} />
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
          )}
          keyExtractor={(item) => `${item.id}-${item.name}`}
          ListFooterComponent={
            meta && meta.page && meta.lastPage && meta.page < meta.lastPage
              ? () => (
                  <React.Fragment>
                    <Spacer size={20} />
                    <Button block bordered onPress={() => this.fetchData({ incrementPage: true })}>
                      <Text>Load More</Text>
                    </Button>
                  </React.Fragment>
                )
              : null
          }
        />
        <Spacer size={20} />
      </Container>
    );
  };
}

const mapStateToProps = (state) => ({
  listFlat: state.articles.listFlat || [],
  listPaginated: state.articles.listPaginated || {},
  meta: state.articles.meta || [],
  pagination: state.articles.pagination || {},
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: dispatch.articles.fetchList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesListContainer);
