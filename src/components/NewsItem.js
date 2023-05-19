import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description, imageUrl,url,date} = this.props
    return (
      <div className='my-3'>
        <div className="card">
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <div className="card-footer text-body-secondary">{new Date(date).toGMTString()}</div>
          <a href={url} target="-blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
        </div>
    </div>
    )
  }
}

export default NewsItem