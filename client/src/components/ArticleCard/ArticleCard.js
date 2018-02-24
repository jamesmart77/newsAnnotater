import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = (props) =>
  // <button {...props} style={{ float: "right", marginBottom: 10 }} className={props.className}>
  //   {props.children}
  // </button>

  <div {...props}>
    <div className="col s6">
      <div className="card medium hoverable">
        <div className="card-image">
          <img src={props.photo}/>
          <span className="card-title left-align">{props.headline}</span>
        </div>
        <div className="card-content" style={{ 'padding-top': "5px"}}>
          <p>{props.snippet}</p>
        </div>
        <div className="card-action">
          {/* <Link to={props.web_url}>
            Read Full Article 
          </Link> */}
          <a href={props.url} target="on_blank">Read Full Article</a>
          <a class="btn-floating btn-medium waves-effect waves-light orange right"><i class="material-icons">grade</i></a>
        </div>
      </div>
    </div>
  </div>;

export default ArticleCard;