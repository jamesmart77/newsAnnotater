import React from "react";

const ArticleCard = (props) =>

  <div>
    <div className="col s12 m12 l6 xl6">
      <div className="card medium hoverable">
        <div className="card-image">
          <img src={props.photo} alt="article"/>
          <span className="card-title left-align">{props.headline}</span>
        </div>
        <div className="card-content" style={{ 'paddingTop': "5px"}}>
          <p>{props.snippet}</p>
        </div>
        <div className="card-action">
          <a href={props.url} target="on_blank">Read Full Article</a>
          <a className="btn-floating btn-medium waves-effect waves-light orange right save-article" onClick={() => props.saveclick(props)}>
            <i className="material-icons">grade</i>
          </a>
        </div>
      </div>
    </div>
  </div>;

export default ArticleCard;