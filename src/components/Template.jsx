import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';

import '../assets/scss/main.scss';

import Footer from './Footer';

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: false,
      isArticleVisible: false,
      articleTimeout: false,
      loading: 'is-loading',
      article: '',
    };
    this.handleOpenArticle = this.handleOpenArticle.bind(this);
    this.handleCloseArticle = this.handleCloseArticle.bind(this);
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: '' });
    }, 100);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  handleOpenArticle(article) {
    this.setState({
      isArticleVisible: !this.state.isArticleVisible,
      article,
    });

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout,
      });
    }, 325);

    setTimeout(() => {
      this.setState({
        articleTimeout: !this.state.articleTimeout,
      });
    }, 350);
  }

  handleCloseArticle() {
    this.setState({
      articleTimeout: !this.state.articleTimeout,
    });

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout,
      });
    }, 325);

    setTimeout(() => {
      this.setState({
        isArticleVisible: !this.state.isArticleVisible,
        article: '',
      });
    }, 350);
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = get(this, 'props.data.site.siteMetadata.description');

    return (
      <div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'is-article-visible' : ''}`}>
        <Helmet>
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription} />
        </Helmet>
        <div id="bg" />
        <div id="wrapper">
          {
            this.props.children({
              ...this.props,
              ...this.state,
              openArticle: this.handleOpenArticle,
              closeArticle: this.handleCloseArticle,
            })
          }
          <Footer timeout={this.state.timeout} />
        </div>
      </div>
    );
  }
}

Template.propTypes = {
  route: PropTypes.object,
};

export default Template;
