import React from "react";

export const CommentFacebook = (props) => {
  const { link, title } = props;

  React.useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="facebookComment">
      <div className="title">{title}</div>

      <div
        className="fb-comments"
        data-href={link}
        data-width="100%"
        data-numposts="1"
      ></div>
    </div>
  );
};
