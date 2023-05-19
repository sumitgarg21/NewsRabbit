import React, { Component } from 'react'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    category: "general",
  };
  static propTypes = {
    catrgory: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
  }
  async updateNews() {
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e11a9288257b46d29daa7f8996360083&page=${this.state.page}&pageSize=16`;
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100)
  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async ()=> {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=e11a9288257b46d29daa7f8996360083&page=${this.state.page+1}&pageSize=16`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  }
  render() {
    return (
      <>
        <h1 style={{marginTop: "70px",textAlign: "center"}}>NewsRabbit - Top {this.props.category.charAt(0).toUpperCase() +this.props.category.slice(1)} Headlines</h1>
          {this.state.loading&&<Spinner/>}
        <InfiniteScroll
          style={{overflow:"hidden"}}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://ma-hub.imgix.net/wp-images/2019/05/28232454/news-intro-template.jpg"
                  }
                  url={element.url}
                  date={element.publishedAt}/>
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/*<div className="container d-flex justify-content-center">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark me-5"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 16)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
          </div>*/}
          </>
    );
  }
}

export default News;
